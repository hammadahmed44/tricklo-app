// TODO Day 4 — YOU wire the routes
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const workspaceController = require('../controllers/workspace.controller');

router.post('/',   auth, workspaceController.createWorkspace);
router.get('/',    auth, workspaceController.getMyWorkspaces);
router.get('/:id', auth, workspaceController.getWorkspaceById);
router.put('/:id', auth, workspaceController.updateWorkspace);

module.exports = router;
