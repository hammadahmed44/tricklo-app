const Workspace = require('../models/Workspace');

//   createWorkspace(userId, { name })
//     - create workspace in DB
//     - set owner to userId
//     - add userId to members array with role 'admin' (creator is always admin)
//     - return workspace
//
const createWorkspace = async (userId, { name }) => {
  // you write this
};

//   getMyWorkspaces(userId)
//     - find all workspaces where members array contains userId
//     - hint: Workspace.find({ 'members.user': userId })
//     - populate owner with name, email, avatar only
//     - return workspaces array
//
const getMyWorkspaces = async (userId) => {
  // you write this
};

//   getWorkspaceById(workspaceId, userId)
//     - find workspace by id
//     - throw error if not found
//     - check userId is in members array — throw error if not a member
//     - populate owner AND members.user with name, email, avatar
//     - return workspace
//
const getWorkspaceById = async (workspaceId, userId) => {
  // you write this
};

//   updateWorkspace(workspaceId, userId, updates)
//     - find workspace by id
//     - throw error if not found
//     - check userId has role 'admin' in members — throw error if not admin
//     - apply updates to workspace
//     - save and return workspace
//
//   Interview Q: Why check role in service not just middleware?
//   Answer: Middleware checks if user is logged in (authenticated).
//   Service checks if user has permission for THIS specific resource (authorized).
//   Two different levels — auth middleware is global, role check is per resource.
//
const updateWorkspace = async (workspaceId, userId, updates) => {
  // you write this
};

module.exports = { createWorkspace, getMyWorkspaces, getWorkspaceById, updateWorkspace };
