const Workspace = require('../models/Workspace');

//   createWorkspace(userId, { name })
//     - create workspace in DB
//     - set owner to userId
//     - add userId to members array with role 'admin' (creator is always admin)
//     - return workspace
//
const createWorkspace = async (userId, { name }) => {
  const workspace= await Workspace.create({
    name,
    owner: userId,
    members: [{
      user: userId,
      role: 'admin'
    }]

  })
  return workspace
};


//   getMyWorkspaces(userId)
//     - find all workspaces where members array contains userId
//     - hint: Workspace.find({ 'members.user': userId })
//     - populate owner with name, email, avatar only
//     - return workspaces array
//
const getMyWorkspaces = async (userId) => {
  const workspaces=await Workspace.find({'members.user':userId}).populate('owner','name email avatar')
  return workspaces
};

//   getWorkspaceById(workspaceId, userId)
//     - find workspace by id
//     - throw error if not found
//     - check userId is in members array — throw error if not a member
//     - populate owner AND members.user with name, email, avatar
//     - return workspace
//

const getWorkspaceById = async (workspaceId, userId) => {
  const workspace = await Workspace.findById(workspaceId)
    .populate('owner', 'name email avatar')
    .populate('members.user', 'name email avatar');
  if (!workspace) throw new Error('Workspace not found');
  const isMember = workspace.members.some(m => m.user._id.toString() === userId);
  if (!isMember) throw new Error('Access denied');
  return workspace;
};

//   updateWorkspace(workspaceId, userId, updates)
//     - find workspace by id
//     - throw error if not found
//     - check userId has role 'admin' in members — throw error if not admin
//     - apply updates to workspace
//     - save and return workspace
const updateWorkspace = async (workspaceId, userId, updates) => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');
  const isAdmin = workspace.members.some(m => m.user.toString() === userId && m.role === 'admin');
  if (!isAdmin) throw new Error('Access denied');
  Object.assign(workspace, updates);
  await workspace.save();
  return workspace;
};
//   Interview Q: Why check role in service not just middleware?
//   Answer: Middleware checks if user is logged in (authenticated).
//   Service checks if user has permission for THIS specific resource (authorized).
//   Two different levels — auth middleware is global, role check is per resource.
//


module.exports = { createWorkspace, getMyWorkspaces, getWorkspaceById, updateWorkspace };
