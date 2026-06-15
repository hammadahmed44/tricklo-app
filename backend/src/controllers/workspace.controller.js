
const workspaceService = require('../services/workspace.service');
const { success, created } = require('../utils/response');

module.exports = {
  createWorkspace: async (req, res) => {
    const workspace = await workspaceService.createWorkspace(req.user.id, req.body);
    return created(res, workspace, 'Workspace created successfully');
  },
  getMyWorkspaces: async (req, res) => {
    const workspaces = await workspaceService.getMyWorkspaces(req.user.id);
    return success(res, workspaces, 'Workspaces retrieved successfully');
  },
  getWorkspaceById: async (req, res) => {
    const workspace = await workspaceService.getWorkspaceById(req.params.id, req.user.id);
    return success(res, workspace, 'Workspace fetched');
  },
  updateWorkspace: async (req, res) => {
    const workspace = await workspaceService.updateWorkspace(req.params.id, req.user.id, req.body);
    return success(res, workspace, 'Workspace updated');
  },
};