s Complete Screen-by-Screen Wireframe Guide
All Screens Index
Category # Screen Name Description
AUTH 1 Login Page Email + password, remember me, forgot password link
AUTH 2 Register Page Name, email, password, confirm password
AUTH 3 Forgot Password Enter email to receive reset link
AUTH 4 Reset Password New password + confirm from email link
AUTH 5 Email Verification Check your email screen after register
ONBOARDING 6 Create Workspace First workspace setup after register
ONBOARDING 7 Invite Members Invite team to workspace after creation
DASHBOARD 8 Home Dashboard All workspaces + recent boards + activity
WORKSPACE 9 Workspace View All boards in a workspace, sidebar nav
WORKSPACE 10 Workspace Settings Name, logo, members, danger zone
WORKSPACE 11 Members Page All members, roles, invite, remove
WORKSPACE 12 Invite via Link Copy invite link, pending invites
BOARD 13 Board View (Empty) Empty board with Add List prompt
BOARD 14 Board View (Populated) Full board with lists and cards
BOARD 15 Board Header + Menu Board title, visibility, members, filter
BOARD 16 Board Settings Name, background, visibility, close board
LIST 17 Add List Inline add list at end of board
LIST 18 List Actions Menu Rename, copy, move, archive list
CARD 19 Card Item (Collapsed) Card in list — labels, members, due date badges
CARD 20 Card Detail Modal Full card: description, checklists, attachments, comments
CARD 21 Card — Move Card Move to different board/list modal
CARD 22 Card — Assign Members Member picker on card
CARD 23 Card — Labels Label picker and creator
CARD 24 Card — Due Date Picker Calendar date picker on card
CARD 25 Card — Attachments File upload + attachment list
CARD 26 Card — Checklist Add checklist, check items, progress bar
SEARCH 27 Search Results Global search across workspace
PROFILE 28 User Profile Avatar, name, email, change password
NOTIFICATION
S
29 Notifications Panel Bell dropdown — assigned, mentioned, due
MOBILE 30 Mobile Board View Responsive mobile layout
AUTH SCREENS (Screens 1-5)
Screen 1 — Login Page
T
Taskify
Manage work visually
■ Design System
■ Sprint Planning
■ Product Roadmap
Welcome back
Sign in to your workspace
Email address
ali@example.com
Password
••••••••
Remember me Forgot password?
Sign In
or
G Continue with Google
Don't have an account? Sign up
Login Page
■ Component Notes
• Left panel: branding, app name, decorative board previews to show product value
• Email field: auto-focus on page load, validate format on blur
• Password field: show/hide toggle (eye icon) — add to right side of input
• Remember me: stores refresh token for 30 days instead of 7
• Forgot password: routes to Screen 3
• Sign In button: shows loading spinner while API call in progress
• Google OAuth: optional — add if time permits
• Error state: show red border on input + error message below field
• On success: redirect to Dashboard (Screen 8) or last visited board
Screen 2 — Register Page
T Taskify
Create your account
Start managing work better, today
Full name
Ali Ahmed
Work email
ali@company.com
Password
Min 8 characters
Password strength: Good
Confirm password
••••••••
I agree to Terms of Service & Privacy Policy
Create Account
Already have an account? Sign in Register Page
■ Component Notes
• Full name field: trim whitespace, min 2 chars validation
• Email: check uniqueness on blur via API (debounced)
• Password strength indicator: weak/fair/good/strong based on regex rules
• Confirm password: validate match on blur, not on every keystroke
• Terms checkbox: must be checked to enable submit button
• On success: send verification email, redirect to Screen 5 (email verification)
• Error: if email already exists — show 'Email already registered. Sign in?'
Screen 3 — Forgot Password
← Back to Login
■
Forgot your password?
Enter your email and we'll send a
reset link to your inbox.
Email address
ali@example.com
Send Reset Link
■ Check your spam folder if you
 don't receive the email within 5 min
Forgot Password
■ Component Notes
• Token generated: crypto.randomBytes(32).toString('hex'), hashed and stored in DB with 1hr expiry
• Email contains: /auth/reset-password?token=
• Rate limit: max 3 reset requests per email per hour
• If email not found: still show success message (security — don't reveal if email exists)
Screen 4 — Reset Password
■
Set new password
Must be at least 8 characters
New password
••••••••
Confirm new password
••••••••
Reset Password
Token expires in 58 minutes
Reset Password
■ Component Notes
• Token verified on page load — if invalid/expired, show error immediately
• On success: hash new password, clear resetToken from DB, redirect to Login
• Invalidate ALL existing refresh tokens on password reset (security)
Screen 5 — Email Verification
Check your email!
We sent a verification link to
ali@example.com
Didn't receive it? Check spam or
Resend Email
I've verified my email
Email Verification
■ Component Notes
• Resend email: rate limited to once per minute, max 5 per hour
• Verification link: /auth/verify?token= — valid for 24 hours
• On verify: set isVerified=true, redirect to onboarding (Screen 6)
• Unverified users: limited access — can browse but not create content
ONBOARDING SCREENS (Screens 6-7)
Screen 6 — Create Workspace (Onboarding)
Step 1 of 2
Create your Workspace
A workspace is your team's home. Give it a name.
+ Logo
Workspace name
Acme Corp
URL: taskify.app/acme-corp
Workspace type
Engineering
Dev and product teams
Marketing
Campaigns and content
Design
Creative projects
Continue →
Create Workspace
■ Component Notes
• Workspace slug: auto-generated from name, editable, checked for uniqueness
• Logo upload: Cloudinary upload, circular crop, optional
• On continue: create workspace in DB, set user as admin, go to Screen 7
• Skip option: allow skipping onboarding, go directly to dashboard
Screen 7 — Invite Members (Onboarding Step 2)
Step 2 of 2
Invite your team
Boards work better with your team
Invite link
taskify.app/invite/xk92mf Copy
Or invite by email
sara@co.com × ahmed@co.com ×
Role
Member ■
Send Invites
or
Skip for now
Invite Members
■ Component Notes
• Invite link: unique per workspace, never expires unless regenerated
• Email tags: comma-separated or enter key adds email chip
• Role dropdown: Member or Admin — viewer role available per-board only
• Send invites: creates pending invite records, sends emails in background queue
• Skip: goes to Dashboard (Screen 8) with empty workspace
DASHBOARD SCREEN (Screen 8)
Screen 8 — Home Dashboard
T Taskify ■ Search... A ■
■ Home
■ Boards
■ Members
■ Settings
WORKSPACE Good morning, Ali ■
Here's what's happening in your workspace
12
Active Boards
34
Cards Due Today
5
Team Members
3
Overdue
Recent Boards
Product Roadmap
Last edited 2h ago
Sprint Board
Last edited 2h ago
Bug Tracker
Last edited 2h ago
★ Starred Boards
★ Design System ★ Q4 Planning
Recent Activity
S Sara moved 'Login bug' to Done 2m ago
A Ahmed created 'Sprint 12' board 1h ago
Y You were assigned to 'API Design' 3h ago
Dashboard
■ Component Notes
• Stats cards: clickable — 'Cards Due Today' opens filtered card list
• Recent boards: last 6 boards user visited, most recent first
• Starred boards: user can star/unstar from board header (Screen 15)
• Activity feed: aggregated from AuditLog collection, paginated, real-time via socket
• Search bar: global search across all workspace content (Screen 27)
• Sidebar: Home, Boards, Members, Settings — active state highlighted
• Avatar top-right: dropdown — Profile, Notifications, Sign Out
WORKSPACE SCREENS (Screens 9-12)
Screen 9 — Workspace View (All Boards)
T Taskify ■ Search... A ■
■ Home
■ Boards
■ Members
■ Settings
WORKSPACE
AC Acme Corp
5 members • 12 boards
+ Invite
All Boards ★ Starred Recently Viewed
Product Roadmap
12 cards
✏ Sprint Board
8 cards
✏ Bug Tracker
23 cards
✏
Q4 Planning
5 cards
✏ Design System
18 cards
✏ Marketing
9 cards
✏
+ Create new board Workspace View
■ Component Notes
• Board cards: click opens board (Screen 14). Hover shows edit/archive options
• Starred filter: shows only boards the current user has starred
• + Create new board: opens inline form or modal — name, background color/image
• Board count badge: shows number of active cards
• Workspace header: logo, name, member count, invite button
• Visibility badge per board: private/workspace/public (lock icon / globe icon)
Screen 10 — Workspace Settings
T Taskify A ■
■ Home
■ Boards
■ Members
■ Settings
WORKSPACE Workspace Settings
General Members Billing
Workspace Name
Acme Corp
Workspace URL
taskify.app/acme-corp
Description
Engineering and product team workspace...
Logo
AC Change Logo
Save Changes
■ Danger Zone
Delete workspace — this cannot be undone
Delete Workspace
Workspace Settings
■ Component Notes
• Tabs: General (this screen), Members (Screen 11), Billing (out of scope)
• Save Changes: PATCH /workspaces/:id — shows success toast
• URL field: validates uniqueness, shows availability check
• Danger zone: confirm modal with workspace name input before delete
• Only workspace admin can see Settings in sidebar
Screen 11 — Members Management
T Taskify A ■
■ Home
■ Boards
■ Members
■ Settings
WORKSPACE Members
5 members
+ Invite
■ Search members...
A
Ali Ahmed
ali@acme.com Admin
S
Sara Khan
sara@acme.com Member ■
A
Ahmed Ali
ahmed@acme.com Member ■
F
Fatima Z
fatima@acme.com Viewer ■
O
Omar B
omar@acme.com Member ■
Members
■ Component Notes
• Role badges: Admin (purple), Member (green), Viewer (grey)
• ■ menu: Change Role, Remove from Workspace
• Current user (Admin) cannot remove themselves
• Search: filters list in real time (client-side for small lists)
• Pending invites section below active members: shows email + Resend/Cancel
BOARD SCREENS (Screens 13-16)
Screen 13 — Empty Board
T Taskify / Acme Corp
Product Roadmap
■ Workspace | ★ | Filter | Members
■ Menu
No lists yet
Add your first list to get started
+ Add a list
Empty Board
■ Component Notes
• Board background: color or image, set in Board Settings
• Board header bar: semi-transparent, always visible above content
• Visibility icon: ■ Private, ■ Workspace, ■ Public
• Star: toggles board as starred — persisted in user preferences
• Filter button: opens filter panel — by label, member, due date
• Members avatars: shows up to 5 member avatars, +N for more
• + Add a list: opens inline input (Screen 17)
Screen 14 — Board View (Fully Populated)
T Taskify / Acme A
Product Roadmap AFilter S ■O
★ ■ ■
Backlog 3 ■
Design new login
S ■ Dec 15
API rate limiting
A ■ Dec 15
DB indexes
A ■ Dec 15
In Progress 2 ■
Auth flow
S ■ Dec 15
Socket setup
A ■ Dec 15
+ Add card
Review 1 ■
Card drag drop
A ■ Dec 15
+ Add card
Done 2 ■
Project setup
A ■ Dec 15
DB schemas
A ■ Dec 15
+ Add card
+ Add lisPopulated Board View
■ Component Notes
• Lists: horizontal scroll when more than 4-5 lists
• List header: name, card count badge, ■ options menu
• Card item: colored label strip, title, member avatar, due date badge
• Card: click anywhere opens Card Detail Modal (Screen 20)
• Drag and drop: react-beautiful-dnd — DragDropContext wraps board, Droppable per list
• Online presence: show avatars of members currently viewing this board (Socket.io)
• Filter active: faded cards that don't match filter, highlighted cards that do
• + Add card: inline input at bottom of each list
• + Add list: translucent button at end of list row
CARD SCREENS (Screens 19-26)
Screen 20 — Card Detail Modal (Most Important Screen)
Feature Priority ×
Implement JWT refresh token rotation
In list: In Progress →
MEMBERS
A S O +
DESCRIPTION
Implement secure JWT token rotation. Access
tokens expire in 15 min. Refresh tokens stored
as httpOnly cookies. Rotate on every use.
CHECKLIST
60%
✓ Create access token utility
✓ Create refresh token utility
✓ Add auth middleware
Implement token rotation
Write tests
COMMENTS
S Sara: Looks good, adding unit tests tomorrow
2h ago
Write a comment...
■ Members
■ Labels
■ Due Date
■ Attachments
■ Checklist
■ Move
■ Archive
Card Detail Modal
■ Component Notes
• Modal: overlays board, click outside or × to close, no page navigation
• Title: inline editable — click to edit, blur to save (PATCH /cards/:id)
• In list: shows current list, click to open Move Card modal (Screen 21)
• Members: click + to open member picker (Screen 22)
• Description: rich text editor (TipTap or Quill), auto-save on blur
• Checklist: add items, check/uncheck, delete, show progress bar
• Comments: real-time via Socket.io, edit/delete own comments
• Right sidebar actions: each opens a sub-panel within the modal
• Labels: multi-select, create custom labels (Screen 23)
• Due date: calendar picker (Screen 24), overdue shows red
• Attachments: drag-drop or click to upload via Cloudinary (Screen 25)
• Move: change list or board (Screen 21)
• Archive: soft delete — hides card, recoverable from board settings
Screen 21 — Move Card Modal
Move Card ×
Board
Product Roadmap ■
List
In Progress ■
Position
2 ■
Move Card
Move Card
■ Component Notes
• Board dropdown: shows all boards user has access to in workspace
• List dropdown: updates when board changes — shows lists for selected board
• Position: 1-based number, defaults to end of selected list
• On Move: PUT /cards/:id/move — updates listId, boardId, position, emits socket event
• Optimistic UI: card visually moves before API confirms
Screen 22 — Card Members / Assign
Members ×
■ Search members...
Board Members
A Ali Ahmed ✓
S Sara Khan ✓
A Ahmed Ali
F Fatima Z
Card Members
■ Component Notes
• Toggle assignment: click member row to assign/unassign instantly
• API: POST /cards/:id/members to add, DELETE /cards/:id/members/:userId to remove
• On assignment: send notification to assigned member (email + in-app)
• Socket event emitted: all board members see member avatar appear on card
• Search: filters workspace members by name or email
Screen 24 — Due Date Picker
Due Date ×
‹ December 2024 ›
S M T W T F S
7
8 9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30 31
Time (optional)
11:59 PM
Save Due Date
Remove
Due Date Picker
■ Component Notes
• Dates in past: greyed out, not selectable
• Selected date: highlighted in PRIMARY color
• Overdue: card shows red due date badge, overdue label
• Due soon (within 24h): yellow badge on card
• Remove button: clears due date from card
• Socket event: due date change broadcast to all board members
Screen 25 — Card Attachments
Attachments ×
■ Drag & drop files here or
Browse
Max 5MB per file • Images, PDF, Docs
design-specs.pdf
70%
Attached Files (2)
■
wireframes.png
Image • 2.1 MB • 2h ago ↓ ■
■
api-docs.pdf
PDF • 0.8 MB • Yesterday ↓ ■
Attachments
■ Component Notes
• Upload: POST /upload/card/:id — multer streams to Cloudinary
• Progress bar: track upload progress using XMLHttpRequest onprogress event
• Download: GET Cloudinary URL with content-disposition: attachment
• Delete: sends DELETE request, removes from Cloudinary AND card.attachments array
• Image preview: clicking image attachment opens lightbox preview
• File type icons: different icons for PDF, image, doc, zip
SEARCH + PROFILE + NOTIFICATIONS (Screens 27-29)
Screen 27 — Global Search
T Taskify A ■
■ Home
■ Boards
■ Members
■ Settings
WORKSPACE ■ Search cards, boards, members... × Clear
All Cards Boards Members
Results for "auth" 12 results
■
Implement JWT auth middleware
Product Board → In Progress
CARD
■
Auth flow test coverage
Sprint Board → Review
CARD
■
OAuth Google integration
Product Board → Backlog
CARD
■
Auth Service Board
Acme Corp workspace
BOARD
■
Sara Auth
sara.auth@acme.com
MEMBER
Search Results
■ Component Notes
• Search: debounced 300ms — GET /search?q=auth&type;=card&workspaceId;=x
• MongoDB text index on Card.title, Card.description, Board.name
• Results: grouped by type (cards first, then boards, then members)
• Click card result: opens Card Detail Modal (Screen 20)
• Click board result: navigates to board (Screen 14)
• Filter chips: narrow results by type
• Highlight matching text in results
Screen 29 — Notifications Panel
T Taskify ■ A ■
3
Notifications Mark all
All Assigned Mentions
S
Sara assigned you to
'Fix login bug'
2m ago
A
Ahmed mentioned you in
'API design card'
1h ago
■
Card 'Sprint planning' is
due tomorrow
3h ago
O
Omar joined the workspace
Acme Corp
Yesterday
S
Sara commented on
'Auth middleware'
2 days ago
Notifications Panel
■ Component Notes
• Bell icon: shows unread count badge, real-time via Socket.io
• Tabs: All, Assigned (card assignments), Mentions (@user in comments)
• Unread: blue background + blue dot indicator
• Click notification: marks as read + navigates to relevant card/board
• Mark all: bulk mark all as read
• Notification types: card.assigned, card.mentioned, card.due_soon, member.joined
• Real-time: new notifications appear instantly via socket event
USER PROFILE (Screen 28)
Screen 28 — User Profile
T Taskify A ■
■ Home
■ Boards
■ Members
■ Settings
WORKSPACE Profile Settings
Profile Security Preferences
A Change Photo
Remove Photo
First Name
Ali
Last Name
Ahmed
Email Address
ali@acme.com
Bio
Full-stack engineer. Love building products.
Timezone
Asia/Karachi (PKT, UTC+5) ■
Save Changes
User Profile
■ Component Notes
• Profile photo: upload to Cloudinary, circular crop — same upload middleware
• Security tab: Change Password (old + new + confirm), Active Sessions list
• Preferences tab: theme (dark/light), notification settings, language
• Timezone: used for due date display and notification timing
• Email change: requires re-verification if email changed
• Active sessions: show device, location, last active — revoke individual sessions
MOBILE VIEW (Screen 30)
Screen 30 — Mobile Board View (Responsive)
9:41 ●●●●
Taskify A
Product Roadmap
Last edited 2h ago
Sprint Board
Last edited 2h ago
Bug Tracker
Last edited 2h ago
Q4 Planning
Last edited 2h ago
Design System
Last edited 2h ago
■
Home
■
Boards
■
Alerts
■
Profile
Board List
9:41 ●●●●
Product Roadmap ‹ ›
Backlog Auth middleware In Progress Review
S
■ Dec 15
Token rotation
A
■ Dec 15
Rate limiting
A
■ Dec 15
← Back + Add
Board View
9:41 ●●●●
← Card
Feature
Auth middleware
■ Members ›
■ Due Date ›
■ Labels ›
Description
Implement JWT middleware
for protected routes...
Add comment...
Card Detail
Mobile Views — Board List | Board View | Card Detail
■ Component Notes
• Board list: full-width cards, bottom navigation bar (Home/Boards/Alerts/Profile)
• Board view: tab bar for list switching (swipe between lists on mobile)
• Card detail: full-screen modal on mobile, sections collapsed by default
• Responsive breakpoints: >= 768px = desktop layout, < 768px = mobile
• Bottom nav: replaces sidebar on mobile
• Touch-friendly: all tap targets >= 44px height
• Drag and drop: disabled on mobile — use Move button instead (Screen 21)
Complete Screen Summary
# Screen Route / Trigger Key React Component Key API
1 Login /login POST /auth/login
2 Register /register POST /auth/register
3 Forgot Password /forgot-password POST /auth/forgot
4 Reset Password /reset-password?token=x POST /auth/reset
5 Email Verify /verify?token=x GET /auth/verify
6 Create Workspace /onboarding POST /workspaces
7 Invite Members /onboarding/invite POST /workspaces/:id/invite
8 Dashboard / GET /workspaces
9 Workspace View /:workspaceSlug GET /workspaces/:id/boards
1
0
Workspace Settings /:workspaceSlug/settings PUT /workspaces/:id
1
1
Members /:workspaceSlug/members GET /workspaces/:id/members
1
2
Invite Link /:workspaceSlug/invite GET /workspaces/:id/invite-link
1
3
Empty Board /:workspaceSlug/boards/:id GET /boards/:id
1
4
Populated Board /:workspaceSlug/boards/:id GET /boards/:id
1
5
Board Header Part of BoardPage PUT /boards/:id
1
6
Board Settings Modal on BoardPage PUT / DELETE /boards/:id
1
7
Add List Inline on BoardPage POST /lists
1
8
List Actions Dropdown on ListColumn PUT / DELETE /lists/:id
1
9
Card (collapsed) Part of ListColumn —
2
0
Card Detail Modal Click card GET/PUT /cards/:id
2
1
Move Card Card modal action PUT /cards/:id/move
2
2
Assign Members Card modal action POST /cards/:id/members
2
3
Labels Card modal action PUT /cards/:id
2
4
Due Date Card modal action PUT /cards/:id
2
5
Attachments Card modal action POST /upload/card/:id
2
6
Checklist Card modal action PUT /cards/:id
2
7
Search /search GET /search?q=x
2
8
Profile /profile PUT /users/me
2
9
Notifications Bell icon dropdown GET /notifications
3
0
Mobile Responsive All components Same APIs
Now say 'start Day 1' — let's build this.