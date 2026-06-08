ant App + Full Interview Strategy React 6yr | Node/Express | MongoDB | Redis | Sy
Table of Contents
# Section Pg
1 The Strategy — Big Picture 3
2 Trello App — Full Feature List (Nothing Skipped) 4
3 Database Schema Design 5
4 Backend Architecture + API Design 6
5 Frontend Architecture + Senior React Patterns 7
6 Where to Use AI vs Write Yourself 8
7 22-Day Day-by-Day Plan 9
8 File Uploads — Cloudinary (Build This) 11
9 Redis — Full Concept Guide (Explain Without Building) 12
10 Email + Audit Logs — Explain Only 13
11 Interview Topics Master List (HIGH/MED/LOW) 14
12 React Deep Dive — Senior Q&A; 15
13 Node/Express Deep Dive — Senior Q&A; 16
14 MongoDB Deep Dive — Senior Q&A; 17
15 System Design — Design Trello Out Loud 18
16 The Question List — Parallel Prep Strategy 19
17 Mock Interview Guide + Top 10 Questions 20
1. The Strategy — Big Picture
The Brutal Truth
Building an app alone will NOT get you the job. Interview is a separate skill. You must build AND study in
parallel — every feature you build maps directly to interview topics you study that same day.
The Two-Track Parallel System
TRACK A — BUILD (70%) TRACK B — EXPLAIN (30%)
Build one feature per day Same evening: study that feature's theory
Backend first, then frontend Talk out loud — explain every decision you made
Ask AI for boilerplate only Answer: Why did you structure it this way?
Never copy-paste code you can't explain Weekend: mock Q&A session with yourself
Deploy early (Day 19-20) Final 2 days: full mock interview
4 Non-Negotiables
1
Deploy live URL by Day 20
Live link on CV = instant credibility boost
2
Explain every single line you wrote
If you cannot explain it — delete it and rewrite
3
Last 6 days prep > first 16 days build
Interview skill is the real bottleneck, not the app
4
Build file uploads — it's only 2 hours
Cloudinary + Multer = senior signal in interview
2. Trello Multi-Tenant App — Full Feature List (Nothing Skipped)
Every feature is here. BUILD = write the code. EXPLAIN = understand concept deeply, no code needed.
Feature Status What to Build Interview Topics Priority
Auth BUILD Register, Login, Logout, JWT access + refresh
tokens, bcrypt, password reset flow
JWT internals, bcrypt, stateless auth, refresh
pattern, security
HIGH
Workspaces BUILD Create org/team, invite members via email
token, isolated data per workspace,
workspace settings
Multi-tenancy, data isolation, invitation
patterns
HIGH
Boards BUILD Create/archive/delete, visibility
(private/workspace/public), board members +
roles
CRUD design, REST API, permissions
model
HIGH
Lists BUILD Create/rename/delete/reorder, position
tracking for ordering
MongoDB position ordering, optimistic UI,
drag state
HIGH
Cards BUILD Full CRUD, move between lists, assign
members, due dates, labels, position
Complex state mgmt, drag-drop, React perf,
optimistic UI
HIGH
Card Detail
Modal
BUILD Description (rich text), comments, checklists,
member assignment
Nested data, MongoDB schema relations,
modal UX
HIGH
Members +
RBAC
BUILD Role-based access (admin/member/viewer),
invite flow, middleware enforcement
Authorization, RBAC, middleware patterns HIGH
Real-time
(Socket.io)
BUILD Live board updates on card move, online
presence indicator, room per board
WebSockets, event-driven, Socket.io rooms,
scaling
HIGH
File Uploads BUILD Card attachments, board/workspace cover
image via Cloudinary
Multer, Cloudinary/S3, file handling, upload
security
HIGH
Search BUILD Search cards across workspace, debounced
input
MongoDB text indexes, debounce hook,
query perf
MEDIUM
Pagination BUILD Infinite scroll on card lists, paginated board list Cursor pagination, React infinite scroll
pattern
MEDIUM
Error Handling BUILD Global Express error handler, React error
boundaries, toast notifications
Production patterns, defensive coding HIGH
Deploy + CI/CD BUILD Railway (BE), Vercel (FE), GitHub Actions
pipeline, env config
DevOps, deployment, env management,
CI/CD
MEDIUM
Redis Caching EXPLAIN
ONLY
Cache board data, session store, pub/sub for
Socket.io scaling
Caching strategies, Redis data structures,
pub/sub
HIGH
Email
Notifications
EXPLAIN
ONLY
Notify on card assignment, mention, due date
— via Nodemailer/SendGrid
Email architecture, async job queues,
transactional email
MEDIUM
Audit Logs EXPLAIN
ONLY
Track all actions per workspace (who moved
what card when)
Event sourcing concept, append-only logs,
compliance
LOW
3. Database Schema Design
Mental Model: 3 Questions Only
For every entity ask: (1) What IS it? (2) What does it HAVE? (3) What does it BELONG TO?
User
■■■owns■■> Workspace
■■■has■■> Board
■■■has■■> List
■■■has■■> Card
■■■has■■> Comments
■■■has■■> Checklists
■■■has■■> Attachments
User
_id: ObjectId
name: String (required)
email: String (unique, required, lowercase)
password: String (bcrypt hashed, never returned in response)
avatar: String (Cloudinary URL)
refreshToken: String (hashed in DB)
isVerified: Boolean default false
createdAt: Date
Workspace
_id: ObjectId
name: String (required)
slug: String (unique, auto-generated)
owner: ObjectId ref User
members: [{ user: ObjectId ref User, role: enum[admin, member] }]
logo: String (Cloudinary URL)
inviteToken: String (for workspace invite link)
createdAt: Date
Board
_id: ObjectId
name: String
workspace: ObjectId ref Workspace
members: [{ user: ObjectId ref User, role: enum[admin, member, viewer] }]
visibility: enum[private, workspace, public] default: workspace
background: String (color hex or image URL)
archived: Boolean default false
createdAt: Date
List
_id: ObjectId
name: String
board: ObjectId ref Board
position: Number // fractional indexing (1024, 2048...) for reordering without updating
all
archived: Boolean default false
Card
_id: ObjectId
title: String
description: String (rich text HTML)
list: ObjectId ref List
board: ObjectId ref Board
members: [ObjectId ref User] // assigned users
labels: [{ text: String, color: String }] // embedded - small, fixed size
checklist: [{ text: String, done: Boolean }] // embedded - belongs only to this card
attachments: [{ url: String, filename: String, uploadedBy: ObjectId }]
dueDate: Date
position: Number // fractional indexing within list
archived: Boolean default false
createdBy: ObjectId ref User
createdAt: Date
Comment
_id: ObjectId
card: ObjectId ref Card
author: ObjectId ref User
text: String
createdAt: Date
updatedAt: Date
Embed vs Reference — The Decision Rule
Embed when... Reference when...
Data is always needed with parent Data can grow unbounded
1-to-few relationship 1-to-many or many-to-many
Example: card labels (small, fixed) Example: comments on card (can grow infinitely)
Example: checklist items on card Example: board members (users exist independently)
4. Backend Architecture + API Design
Folder Structure (Senior Pattern — Services Layer Separated)
backend/
src/
config/
db.js mongoose connection
cloudinary.js cloudinary config
redis.js redis client (for concept awareness)
controllers/ thin — just call service, return response
auth.controller.js
board.controller.js
card.controller.js
upload.controller.js
middleware/
auth.js verify JWT, attach req.user
rbac.js checkRole(admin|member|viewer)
errorHandler.js global error handler
validate.js zod schema validation
rateLimiter.js express-rate-limit on auth routes
upload.js multer + cloudinary storage
models/
User.js Workspace.js Board.js List.js Card.js Comment.js
routes/
auth.routes.js workspace.routes.js board.routes.js
list.routes.js card.routes.js upload.routes.js
services/ ALL business logic lives here
auth.service.js token generation, validation
board.service.js board operations
card.service.js card move, position recalculation
email.service.js nodemailer wrapper
sockets/
board.socket.js socket rooms + event handlers
utils/
jwt.js response.js paginate.js slugify.js
validations/
auth.schema.js board.schema.js card.schema.js
app.js
server.js
.env .env.example
All Middleware to Build
Middleware What it Does Interview Topic
auth.js Verify JWT access token, attach req.user to
request
JWT internals, stateless auth, token expiry
rbac.js checkRole middleware — checks req.user
role on workspace/board
RBAC, authorization vs authentication
errorHandler.js Global Express error handler, formats all
errors consistently
Error handling patterns, never expose stack in
prod
validate.js Zod schema validation on req.body before
hitting controller
Input validation, security, Zod vs Joi
rateLimiter.js express-rate-limit on /auth/* routes, prevent
brute force
Rate limiting, DDoS basics, security
upload.js multer + cloudinary-storage, handle file
streams to Cloudinary
Multer, Cloudinary, S3 pattern, streams
Complete API Routes
AUTH
POST /api/auth/register body: {name, email, password}
POST /api/auth/login body: {email, password}
POST /api/auth/refresh cookie: refreshToken
POST /api/auth/logout clears refresh token
POST /api/auth/forgot-password sends reset email
POST /api/auth/reset-password body: {token, newPassword}
WORKSPACES
POST /api/workspaces create workspace
GET /api/workspaces get my workspaces
GET /api/workspaces/:id get one workspace
PUT /api/workspaces/:id update workspace
POST /api/workspaces/:id/invite send invite email
GET /api/workspaces/join/:token accept invite
BOARDS
POST /api/boards create board
GET /api/boards/:id get board with lists+cards
PUT /api/boards/:id update board
DELETE /api/boards/:id archive board
GET /api/workspaces/:id/boards all boards in workspace
LISTS
POST /api/lists create list
PUT /api/lists/:id rename list
DELETE /api/lists/:id archive list
PUT /api/lists/reorder update positions array
CARDS
POST /api/cards create card
GET /api/cards/:id get card detail
PUT /api/cards/:id update card
DELETE /api/cards/:id archive card
PUT /api/cards/:id/move {newListId, newPosition}
POST /api/cards/:id/comments add comment
POST /api/cards/:id/members assign member
UPLOADS
POST /api/upload/card/:id upload card attachment
POST /api/upload/avatar upload user avatar
POST /api/upload/board/:id upload board cover
5. Frontend Architecture + Senior React Patterns
Folder Structure (Feature-Based — What Senior Engineers Use)
frontend/src/
features/
auth/
Login.jsx Register.jsx ForgotPassword.jsx
authSlice.js authApi.js
workspace/
WorkspaceDashboard.jsx WorkspaceSettings.jsx
workspaceSlice.js workspaceApi.js
board/
BoardPage.jsx BoardHeader.jsx BoardSidebar.jsx
boardSlice.js boardApi.js
list/
ListColumn.jsx AddList.jsx ListHeader.jsx
card/
CardItem.jsx CardModal.jsx CardChecklist.jsx
CardMembers.jsx CardAttachments.jsx
cardSlice.js cardApi.js
hooks/
useAuth.js auth state + actions abstracted
useBoard.js board data + socket events
useDragDrop.js all drag logic in one place
useDebounce.js for search input
useSocket.js socket connection management
useFileUpload.js upload progress + error handling
useInfiniteScroll.js pagination hook
components/
ui/ Button.jsx Input.jsx Modal.jsx Avatar.jsx Badge.jsx Spinner.jsx Toast.jsx
layout/ Sidebar.jsx Navbar.jsx PageWrapper.jsx
context/
AuthContext.jsx global auth state
SocketContext.jsx single socket connection shared app-wide
services/
api.js axios instance + request/response interceptors
auth.service.js login, register, refresh token calls
board.service.js board API calls
upload.service.js file upload with progress
store/
index.js Redux Toolkit or Zustand setup
utils/
constants.js helpers.js formatDate.js
Senior React Patterns — Interviewers Notice These
Pattern Why It Impresses Interviewers
Feature-based folder structure Shows large codebase experience. Not page-based.
Custom hooks for ALL business logic useBoard, useDragDrop — interviewers ask about these directly
Axios interceptors for auth Auto-refresh token on 401, retry original request transparently
Optimistic UI on card move Update state before API confirms — instant feel, rollback on error
Error boundaries per feature If board crashes, rest of app still works
React.lazy() + Suspense for routes Code splitting — shows performance awareness
useMemo/useCallback only where
measured
Not over-memoizing — shows real knowledge vs cargo cult
SocketContext — one connection Single WebSocket shared across app, no duplicate connections
Zod on frontend too Same schemas as backend — type-safe, consistent validation
Controlled file upload with progress useFileUpload hook with progress state and error state
6. Where to Use AI vs Write Yourself
USE AI — SAVE TIME HERE WRITE YOURSELF — OWN THIS
+ Complete folder + file structure setup * React components — your 6yr strength
+ Express server boilerplate + app.js * Custom hooks — interviewers ask about these
+ All Mongoose model schemas * State management logic (Redux/Zustand)
+ All middleware (auth, error, validate, upload) * Connecting frontend to backend (you must own this)
+ Socket.io server setup + room management * Controller logic — write it, then ask AI to review
+ Cloudinary config + multer-cloudinary setup * Auth flow implementation (JWT, refresh)
+ Seed data / mock data scripts * Drag and drop logic — you must explain it
+ Docker + CI/CD GitHub Actions config * Socket.io frontend integration
+ Debugging your errors and explaining them * File upload UI + progress handling
+ Code review — ask: what am I missing? * API route logic — write yourself first
+ Interview Q&A; practice sessions * Performance optimization decisions
+ Explaining any concept you don't understand * Error boundary placement decisions
+ Zod validation schemas * Any code you will be asked about in interview
+ Axios interceptor boilerplate * Business logic in services layer
7. 22-Day Day-by-Day Plan (Jun 8 - Jun 30)
PHASE 1 — Backend Foundation (Days 1-7)
Jun 8 Day 1 Folder structure + Express server + MongoDB + .env + basic health check route
Jun 9 Day 2 User model + Auth APIs: register, login, logout, refresh token
Jun 10 Day 3 Auth middleware + global error handler + Zod validation + rate limiter
Jun 11 Day 4 Workspace model + APIs (CRUD + invite token generation)
Jun 12 Day 5 Board + List APIs + RBAC middleware (admin/member/viewer)
Jun 13 Day 6 Card APIs (CRUD + move endpoint + position logic)
Jun 14 Day 7 Comment APIs + Socket.io setup + test ALL routes in Postman
PHASE 2 — React Frontend (Days 8-14)
Jun 15 Day 8 Vite setup + folder structure + axios instance + interceptors + routing
Jun 16 Day 9 Auth UI: Login, Register, AuthContext, protected routes, token storage
Jun 17 Day 10 Workspace dashboard + create workspace UI
Jun 18 Day 11 Board page layout + List columns UI + Add list
Jun 19 Day 12 Card CRUD UI within lists + Card item component
Jun 20 Day 13 Drag and drop (react-beautiful-dnd) + optimistic UI + position update
Jun 21 Day 14 Card detail modal: description, members, due date, labels, checklists
PHASE 3 — Advanced Features (Days 15-20)
Jun 22 Day 15 Socket.io frontend: live board updates + online presence indicator
Jun 23 Day 16 File uploads: Cloudinary config + multer middleware + upload UI + progress
Jun 24 Day 17 Member invite flow + role management UI + workspace settings
Jun 25 Day 18 Search feature + debounce hook + pagination/infinite scroll
Jun 26 Day 19 Bug fixing + error boundaries + loading states + UI polish
Jun 27 Day 20 Deploy: Railway (BE) + Vercel (FE) + env config + fix prod bugs
PHASE 4 — Interview Prep (Days 21-22)
Jun 28 Day 21 React deep dive + Node/Express deep dive + mock interview session 1
Jun 29 Day 22 MongoDB + System design + Redis concepts + mock interview session 2
Jun 30 Day 23 Fix weak spots + CV update + LinkedIn + GitHub README + start applying
Daily Schedule
9:00 AM - 12:00 PM | BUILD — code only, zero distractions
12:00 PM - 1:00 PM | Break
1:00 PM - 2:30 PM | STUDY — theory of exactly what you built today
2:30 PM - 3:00 PM | EXPLAIN OUT LOUD — talk through every decision you made
Every Sunday | Mock Q&A; — ask AI to quiz you on the week's features
8. File Uploads — Cloudinary (BUILD THIS — 2 Hours Max)
Why Build It
File uploads come up in almost every senior interview. If you built it, you can answer every follow-up question. If
you just read about it, you will get caught out immediately.
Setup (Ask AI for this boilerplate)
npm install multer cloudinary multer-storage-cloudinary
// config/cloudinary.js
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name, api_key, api_secret });
// middleware/upload.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
cloudinary,
params: { folder: 'trello-clone', allowed_formats: ['jpg','png','pdf','gif'] }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
// routes/upload.routes.js
router.post('/card/:id', auth, upload.single('file'),
uploadController.cardAttachment);
router.post('/avatar', auth, upload.single('avatar'), uploadController.userAvatar);
Interview Questions on File Uploads — Answers
Q: What happens if the upload fails midway?
Multer handles the stream. If it fails before Cloudinary gets it, no file is saved. If Cloudinary gets it but DB write fails, I
catch the error, delete from Cloudinary using the public_id, and return error to client. Always clean up external
resources on failure.
Q: How do you handle large files?
Set file size limit in multer (limits.fileSize). For very large files (video) you'd use Cloudinary's direct upload from browser
— client gets a signed upload URL from your server, uploads directly to Cloudinary, then sends back the URL. Your
server never handles the bytes.
Q: Why Cloudinary over storing files on your server?
Server storage doesn't scale — if you have multiple Node instances, files on one instance aren't available to others.
Cloudinary/S3 is a dedicated file store, globally distributed, with CDN built in, image transformations, and you only pay
for what you use.
Q: What is S3 and how does it differ from Cloudinary?
Both are object storage. Cloudinary adds media-specific features: automatic image optimization, on-the-fly resizing via
URL params, video transcoding. S3 is raw storage, cheaper at scale, no media processing. For a production app you'd
likely use S3 for general files and Cloudinary for images/video.
9. Redis — Full Concept Guide (Explain Without Building)
You do NOT need to run Redis in your app. But you MUST be able to explain it deeply. Here is everything you
need.
What is Redis?
Redis is an in-memory data store. It sits between your app and MongoDB. Because it lives in RAM, reads are
100x faster than database reads. You use it for data that is read often and changes rarely.
Where Would You Use Redis in Trello?
Use Case How It Works
Session Store Store JWT refresh tokens in Redis instead of MongoDB. Fast lookup, auto-expiry with TTL,
easy invalidation on logout.
Board Caching Cache GET /boards/:id response. Board data doesn't change every second. First request
hits MongoDB and caches. Next 100 requests hit Redis. Cache invalidated when board is
updated.
Rate Limiting Use Redis to count requests per IP. express-rate-limit can use Redis as store so limits work
across multiple Node instances.
Socket.io Pub/Sub When you scale to multiple Node servers, Socket.io needs Redis as message broker. Server
1 publishes card.moved event to Redis. Redis broadcasts to Server 2. Server 2 emits to its
connected clients.
Search Autocomplete Cache search results for common queries. 5 minute TTL. Massively reduces DB load.
Caching Patterns — Know These Cold
Cache-Aside (most common — what you'd use):
1. Request comes in for board data
2. Check Redis first — HIT? Return it. Done.
3. MISS? Query MongoDB, store result in Redis with TTL, return data
4. On board update — DELETE the Redis key (cache invalidation)
Write-Through:
Write to DB and Redis simultaneously on every write
Pro: cache always fresh Con: every write is slower
TTL (Time To Live):
Every cached key has an expiry
Board data: 5 min TTL User session: 7 days TTL
Redis Interview Q&A;
Q: Why not just cache in your Node server memory?
If you have multiple Node instances (horizontal scaling), each has its own memory cache — they go out of sync. Redis
is a shared cache — all instances read/write the same data. Also, Node memory cache dies when server restarts;
Redis persists.
Q: What is cache invalidation and why is it hard?
Cache invalidation = deciding when to delete cached data so stale data isn't served. It's hard because you need to
know every place that could change the data. In Trello: moving a card invalidates the board cache AND the list cache
AND possibly search cache. Miss one and users see stale data.
Q: How does Redis pub/sub help scale Socket.io?
Without Redis: User A on Server 1 moves a card. Server 1 emits to its connected clients. User B on Server 2 never
gets the event. With Redis: Server 1 publishes to Redis channel. Redis broadcasts to all subscribers. Server 2 receives
and emits to its clients. All users see the update.
10. Email + Audit Logs — Explain Only (No Code Needed)
Email Notifications
You already use email in your app for workspace invites. That covers the concept. Here is what to say in
interview:
How would you implement email notifications in Trello?
1. Trigger: card assigned to user, mentioned in comment, due date approaching
2. Don't send email synchronously in the API request — that slows response
3. Push to a job queue (Bull/BullMQ with Redis, or AWS SQS)
4. Background worker picks up job, sends via Nodemailer or SendGrid
5. Why queue? If email service is down, job retries. API response is instant.
6. Template: use HTML email templates (handlebars or MJML)
In my app I handle workspace invite emails directly (simple, low volume).
At scale I'd move ALL emails to a queue with retry logic.
Audit Logs
Audit logs = a record of every action taken. Who did what, when. This is an architectural pattern, not just code.
How would you implement audit logs in Trello?
Schema:
AuditLog {
workspace: ObjectId, // scoped per tenant
actor: ObjectId, // who did it
action: String, // 'card.moved', 'member.invited', 'board.created'
entity: { type: String, id: ObjectId }, // what was affected
metadata: Object, // { fromList: 'x', toList: 'y' }
timestamp: Date,
}
Implementation:
Option 1: Mongoose middleware — post-save hook writes to AuditLog
Option 2: Service layer — every service method also writes audit log
Option 3: Event-driven — emit events, audit log service listens
Key point: audit logs are APPEND ONLY — never update, never delete.
This is the event sourcing pattern.
Why not in my current app?
I'd add it in production. For this project scope I log to console.
The pattern is straightforward to add — it's a cross-cutting concern.
11. Interview Topics Master List
React — Senior Level
React reconciliation and Virtual DOM diffing algorithm HIGH
Fiber architecture — what it is and why it was introduced HIGH
Concurrent mode and Suspense
MEDI
UM
useEffect — cleanup, dependency array, common bugs HIGH
useMemo vs useCallback — real difference, when NOT to use HIGH
Custom hooks — patterns, examples from YOUR app HIGH
Context API performance pitfalls — why it causes re-renders HIGH
State management: Redux Toolkit vs Zustand vs Context HIGH
Code splitting — React.lazy, Suspense, dynamic imports HIGH
Error boundaries — placement strategy, cannot catch async HIGH
React.memo — what it does, when it actually helps
MEDI
UM
Controlled vs uncontrolled components
MEDI
UM
Optimistic UI pattern — update state before API responds HIGH
Key prop — why it matters, common mistakes
MEDI
UM
Portals — use cases (modals, tooltips)
MEDI
UM
React 18 features — automatic batching, transitions
MEDI
UM
Node.js + Express — Senior Level
Event loop — all phases in order, microtask vs macrotask HIGH
Non-blocking I/O — how libuv enables it HIGH
Middleware chain — next(), error middleware signature HIGH
JWT — structure, signing, verification, expiry HIGH
Refresh token pattern — rotation, httpOnly cookie HIGH
bcrypt — salt rounds, why not MD5/SHA HIGH
Global error handler — Express error middleware (4 params) HIGH
CORS — what it is, preflight, how to configure correctly HIGH
Rate limiting — token bucket vs sliding window algorithm
MEDI
UM
Streams — readable, writable, transform, why they matter
MEDI
UM
Cluster module — child processes, how Node scales
MEDI
UM
process.nextTick vs setImmediate vs setTimeout(0)
MEDI
UM
async/await error handling — try/catch, unhandledRejection HIGH
REST API design — versioning, status codes, naming conventions HIGH
Environment variables — never commit, .env.example pattern
MEDI
UM
Helmet.js — what security headers it sets and why LOW
MongoDB — Senior Level
Embed vs Reference — full decision framework HIGH
Indexing — single field, compound, text, when each helps HIGH
Aggregation pipeline — $match $group $lookup $unwind $project HIGH
$lookup — like SQL JOIN, when to use vs populate() HIGH
Transactions — when you need them in MongoDB
MEDI
UM
Schema design for multi-tenant apps — data isolation HIGH
Mongoose populate vs aggregation — tradeoffs, performance HIGH
Position-based ordering — fractional indexing pattern
MEDI
UM
TTL indexes — auto-delete documents after time period LOW
MongoDB Atlas — clusters, connection string, network access
MEDI
UM
Write concerns — what w:1 vs w:majority means LOW
Query optimization — explain(), index hints
MEDI
UM
Mongoose middleware — pre/post hooks use cases
MEDI
UM
System Design
Design Trello — full system design (you built it, own this) HIGH
Multi-tenancy architectures — shared DB vs schema-per-tenant HIGH
WebSockets vs HTTP polling vs Server-Sent Events — tradeoffs HIGH
Redis — caching patterns, pub/sub, session store HIGH
Horizontal scaling — stateless servers, shared session store HIGH
Load balancing — round robin, sticky sessions
MEDI
UM
CDN — static assets, edge caching, when to use
MEDI
UM
Database indexing at scale — cost of over-indexing HIGH
Microservices vs Monolith — real tradeoffs not just theory HIGH
File storage architecture — direct upload pattern with S3/Cloudinary HIGH
Message queues — async job processing, retry logic
MEDI
UM
CAP theorem — consistency vs availability vs partition tolerance LOW
API gateway — rate limiting, auth, routing at scale
MEDI
UM
DevOps + Deployment
Environment variables — dev vs staging vs production HIGH
CI/CD — what it is, basic GitHub Actions pipeline
MEDI
UM
Docker — what a container is, Dockerfile basics
MEDI
UM
Railway + Vercel deployment — how env vars are set HIGH
HTTPS — SSL/TLS, why it matters, how Vercel handles it
MEDI
UM
CORS in production — common mistakes and fixes HIGH
MongoDB Atlas connection in production — IP whitelist
MEDI
UM
Logs and monitoring — basic concepts LOW
HIGH = almost certain to be asked | MEDIUM = very likely | LOW = good to know, lower priority
12. React Deep Dive — Senior Q&A;
Q: Explain React reconciliation.
React keeps a Virtual DOM — a lightweight JS copy of the real DOM. On every state change, React creates a new
VDOM tree and diffs it against the previous one (reconciliation). Only the changed nodes get applied to the real DOM.
The diffing algorithm uses heuristics: same element type = update, different type = destroy and recreate, keys help
identify list items across re-renders.
Q: What is React Fiber?
Fiber is React's internal reconciliation engine rewrite (React 16+). The old stack reconciler was synchronous — once
started it couldn't be interrupted. Fiber makes rendering interruptible and prioritized. High priority updates (user input)
can interrupt low priority ones (data fetching renders). This enables concurrent mode features like Suspense and
transitions.
Q: useEffect cleanup — when and why?
The cleanup function runs before the component unmounts AND before every re-run of the effect. Critical for: clearing
setTimeout/setInterval (prevents memory leaks), cancelling fetch requests (prevents setState on unmounted
component), removing event listeners, closing WebSocket connections. In my app: useSocket hook cleans up socket
listeners on unmount to prevent duplicate event handlers.
Q: useMemo vs useCallback — real difference?
useMemo memoizes a computed VALUE — reruns only when dependencies change. useCallback memoizes a
FUNCTION REFERENCE — same function object across renders. Use useCallback when passing callbacks to
children wrapped in React.memo. Critical insight: both have a cost (memory + comparison on every render). Only use
when you have a measured performance problem. Over-memoizing is a common senior-level mistake.
Q: How do you prevent Context re-renders?
Context re-renders ALL consumers when value changes. Solutions: 1) Split contexts — AuthContext separate from
ThemeContext, board data separate from UI state. 2) Memoize context value with useMemo. 3) Use selector pattern
with external store (Zustand/Redux). In my app I have AuthContext and SocketContext separate — auth changes don't
re-render Socket consumers and vice versa.
Q: Explain optimistic UI. Did you use it?
Optimistic UI means updating the UI immediately before the API call completes, assuming it will succeed. On success:
do nothing. On failure: rollback to previous state. In my Trello app: when user drags a card, I update the list state
immediately (instant feel), then call the move API. If it fails, I revert. This makes the app feel instant even on slow
connections.
Q: How does drag and drop work in your app?
I used react-beautiful-dnd. It provides DragDropContext (wraps the board), Droppable (each list), and Draggable (each
card). On drag end, I get source and destination list + index. I calculate new position using fractional indexing (position
between the two surrounding cards). I update local state immediately (optimistic) then PATCH /cards/:id/move. If API
fails, revert state.
13. Node/Express Deep Dive — Senior Q&A;
Q: Explain the Node.js event loop in detail.
JS is single-threaded. The event loop has phases: 1) Timers (setTimeout, setInterval callbacks) 2) Pending callbacks
(I/O errors) 3) Idle/Prepare (internal) 4) Poll (retrieve new I/O events — this is where Node waits) 5) Check
(setImmediate callbacks) 6) Close callbacks. Between each phase: process microtask queue (Promise callbacks,
process.nextTick). nextTick runs before ANY other async — can starve the event loop if misused.
Q: How does JWT auth work? Walk me through it.
1) User logs in — server verifies password, creates access token (JWT signed with secret, 15min expiry) and refresh
token (opaque token, 7 days, stored hashed in DB). 2) Access token sent in response body, refresh token in httpOnly
cookie. 3) Client stores access token in memory (not localStorage — XSS risk). 4) Every request sends access token
in Authorization: Bearer header. 5) Auth middleware verifies signature and expiry. 6) On 401, axios interceptor calls
/auth/refresh, gets new access token, retries original request.
Q: What is the difference between authentication and authorization?
Authentication = verifying WHO you are (JWT verification — are you a real logged-in user?). Authorization = verifying
WHAT you can do (RBAC middleware — are you an admin on this board?). In my app: auth middleware does
authentication (verify JWT). rbac middleware does authorization (check role). They are always separate middlewares,
composed in route definitions.
Q: How does your global error handler work?
Express error handling middleware has 4 params: (err, req, res, next). When any middleware calls next(err) or throws
in async (with asyncHandler wrapper), Express skips regular middleware and calls error handler. It checks
err.statusCode (operational errors I created) vs 500 (unexpected). In production, never send stack traces — log them
server-side, return generic message to client. I also handle Mongoose validation errors and cast errors here.
Q: How would you scale your Node app?
1) Horizontal: multiple Node instances behind a load balancer (Nginx or AWS ALB). 2) Node Cluster module: fork one
process per CPU core, master distributes connections. 3) Stateless servers: move sessions to Redis (not in-memory)
so any instance can handle any request. 4) Socket.io at scale: Redis adapter for pub/sub between instances. 5)
Database: MongoDB Atlas with read replicas. 6) CDN for static assets.
14. MongoDB Deep Dive — Senior Q&A;
Q: When do you embed vs reference in MongoDB?
Embed when data is always queried together (card labels — always shown with card), relationship is 1-to-few
(checklist items), and the embedded data belongs exclusively to the parent. Reference when data is shared across
documents (users referenced in multiple boards), can grow unbounded (comments — could be thousands), or needs
to be queried independently. In my app: labels and checklists are embedded in Card. Comments are a separate
collection referencing Card. Members reference User documents.
Q: Explain MongoDB indexing.
An index is a sorted data structure that enables fast lookup without scanning every document. Without index:
MongoDB does a collection scan O(n). With index: O(log n) lookup. Types: single field (most common), compound
(multiple fields, order matters), text index (for search), TTL index (auto-delete after time). Cost: indexes take up disk
space and slow down writes (index must be updated on every write). In my app: board has index on workspaceId (most
common query filter), card has indexes on listId and boardId.
Q: Explain the aggregation pipeline.
$match: filter documents (like WHERE in SQL). $group: group by field and aggregate (like GROUP BY). $lookup: join
with another collection (like JOIN). $unwind: deconstruct array field into separate documents. $project: shape output
fields (like SELECT). $sort, $limit, $skip: for ordering and pagination. Example in my app: get all cards in a workspace
with their assigned member names — $match workspace, $lookup users, $project needed fields.
Q: Mongoose populate() vs $lookup — which to use?
populate() is Mongoose's convenience method — it does multiple queries (1 for main doc + 1 per referenced field).
Easy to use but inefficient for large datasets — N+1 query problem. $lookup is MongoDB's native join — single
aggregation pipeline, one round trip to DB. For simple cases with few docs: populate is fine. For performance-sensitive
queries, reports, or complex joins: use $lookup. In my app I use populate() for single card detail (fine) and $lookup for
board overview with all member data.
15. System Design — Design Trello Out Loud
Follow This Framework Exactly — 45 Minutes Structure
1. Clarify Requirements (3 min)
-> Functional: boards, lists, cards, real-time, multi-tenant, file uploads
-> Non-functional: 99.9% uptime, <200ms API, support 1M users
-> Scale: 100k daily active users, 10k concurrent WebSocket connections
-> Out of scope (for interview): analytics, billing, mobile app
2. High-Level Architecture (5 min)
-> Client (React SPA) -- HTTPS --> CDN --> Load Balancer
-> Load Balancer --> Node/Express API Servers (multiple instances)
-> API Servers --> MongoDB Atlas (primary + read replicas)
-> API Servers --> Redis (cache + session + pub/sub)
-> API Servers --> Cloudinary (file storage)
-> Socket.io --> Redis adapter (real-time across instances)
-> GitHub Actions --> Railway/Render (BE deploy), Vercel (FE deploy)
3. Database Design (5 min)
-> MongoDB: flexible schema suits evolving board/card structure
-> Collections: Users, Workspaces, Boards, Lists, Cards, Comments
-> Indexes: board.workspaceId, card.listId, card.boardId, user.email (unique)
-> Multi-tenancy: every document has workspaceId, every query filters by it
-> Why not SQL? Board/card schema changes often, document model natural fit
4. API Design (3 min)
-> RESTful: resource-based URLs, correct HTTP methods + status codes
-> Auth: JWT access token (15min) + refresh token in httpOnly cookie (7 days)
-> Versioning: /api/v1/* for future-proofing
-> Rate limiting: 100 req/min on auth endpoints, 1000 req/min general
-> Pagination: cursor-based (not offset) for consistent results at scale
5. Real-Time Design (5 min)
-> Socket.io rooms: one room per boardId
-> User joins room on board open, leaves on navigate away
-> Events: card.moved, card.created, card.updated, member.joined
-> Scaling: Redis pub/sub adapter — all Node instances share events
-> Fallback: HTTP polling if WebSocket blocked (Socket.io handles automatically)
6. Scaling (5 min)
-> Horizontal scaling: stateless Node servers, load balanced
-> Redis: session store + board cache (5min TTL) + Socket.io adapter
-> MongoDB: read replicas for GET-heavy endpoints
-> CDN: static assets (React build), board cover images via Cloudinary CDN
-> Rate limiting: Redis-backed across all instances
-> Future: separate notification service, search service (Elasticsearch)
16. The Question List — Parallel Prep Strategy
Do NOT read 200 questions front to back. Map questions to features you build that day.
Building This Feature Study These Questions Same Day
Auth (JWT, bcrypt, refresh) How does JWT work? Sessions vs JWT? bcrypt salt? Refresh token pattern? httpOnly cookie?
Express middleware What is middleware? How does next() work? Error middleware 4 params? What is CORS?
MongoDB schemas Embed vs reference? What is indexing? Aggregation pipeline? Mongoose populate?
Workspace + multi-tenancy How does multi-tenancy work? Shared DB vs isolated schemas? Data isolation patterns?
React Auth UI + Context useContext vs Redux? How do you persist auth? What causes context re-renders?
Lists + Cards CRUD REST API design? HTTP status codes? Idempotency? PATCH vs PUT?
Drag and drop useMemo/useCallback? Optimistic UI? React reconciliation? Fractional indexing?
Card modal useEffect cleanup? Custom hooks? Controlled components? Portal for modal?
Socket.io WebSockets vs HTTP? Socket.io rooms? How to scale WebSockets? Pub/sub?
File uploads Multer streams? S3 vs Cloudinary? Direct upload pattern? File size limits?
Search + pagination MongoDB text indexes? Debounce? Cursor vs offset pagination? Performance?
Deploy What is CI/CD? Docker basics? Env vars in production? CORS in prod?
How to Use the 200-Question PDF
* Never read front to back — use it as a reference, not a textbook
* Each evening: find the questions that match what you built today
* For every question: answer out loud in 60 seconds — if you can't, flag it
* Flagged questions = study those the next morning before coding
* Week 4 last 2 days: timed sessions — 5 questions, 45 minutes, no notes
* Focus HIGH priority questions first — they are almost certain to come up
* Skip questions about tech you never used and won't use
* Best questions to nail: anything about YOUR app decisions and WHY
17. Mock Interview Guide + Top 10 Questions
How to Run Mock Interviews With AI
After every feature is built, say this to Claude:
'I just finished building [feature].
Quiz me like a senior engineer interview — 5 questions,
start easy and go deep. Tell me what I missed.'
After Day 21-22, say:
'Run a full 45-minute mock interview for a senior MERN role.
Mix React, Node, MongoDB, system design.
Give me feedback on every answer.'
The STAR Framework — Every Answer
S — Situation : what problem were you solving
T — Task : what specifically did you need to do
A — Action : what you did and WHY (most important part)
R — Result : what the outcome was
Example — Q: How did you handle real-time in your app?
S: Users needed to see card moves instantly without page refresh.
Multiple team members work on the same board simultaneously.
T: Implement real-time sync for all connected board members.
A: Used Socket.io. Created one room per boardId.
On board open: socket.join(boardId).
On card move: emit card.moved event to room with new position.
Frontend listens and updates state without re-fetching.
Chose Socket.io over polling: lower latency, less server load.
At scale I'd add Redis adapter for multi-server support.
R: Card moves appear instantly for all users, under 50ms latency.
Top 10 Questions They WILL Ask — Answers Framework
1
Walk me through your app architecture end to end
Frontend (React, Vite, feature-based) -> Axios with interceptors -> Express APIs -> MongoDB. Plus Socket.io for real-time,
Cloudinary for files. Talk about every layer and your decisions.
2
Why MongoDB over PostgreSQL for this app?
Board and card schema evolves frequently. Document model maps naturally to nested board/list/card hierarchy. Multi-tenant
workspaces are isolated by workspaceId. Trade-off: no joins like SQL, use $lookup or populate. For this use case MongoDB
is the right tool.
3
How did you implement multi-tenancy?
Every document stores workspaceId. Middleware checks user is a member of the workspace before any operation. All DB
queries filter by workspaceId — no cross-tenant data leakage possible. This is shared-database, shared-schema
multi-tenancy.
4
Explain your JWT auth implementation
Access token (15min, in memory) + refresh token (7 days, httpOnly cookie). Axios interceptor catches 401, calls
/auth/refresh, retries. Never store access token in localStorage — XSS risk. Refresh token in httpOnly prevents JS access —
CSRF protected with SameSite cookie.
5
How does your real-time work and how would you scale it?
Socket.io rooms per boardId. Single Node: works perfectly. Multiple nodes: add Redis pub/sub adapter. Server 1 publishes
card.moved to Redis, Redis broadcasts to Server 2, Server 2 emits to its clients. All users on all servers see updates.
6
Tell me about a performance problem you solved
Drag and drop re-rendering: every card in every list was re-rendering on drag. Fixed with React.memo on CardItem and
useMemo for list data. Also: card position updates were updating every card's position in DB. Switched to fractional indexing
— only update moved card.
7
How do you handle errors in your app?
Backend: global error handler middleware catches all errors. Operational errors (validation, auth) have statusCode and
message. Unexpected errors return 500 with generic message, log stack trace server-side. Frontend: axios interceptor for
network errors, Error boundaries per feature, toast notifications for user feedback.
8
What is RBAC and how did you implement it?
Role-Based Access Control — users have roles (admin/member/viewer) per workspace and per board. checkRole
middleware reads req.user, fetches their role on the resource, compares with required role. Admin can do everything.
Member can create/edit. Viewer is read-only. Roles are stored in the workspace.members and board.members arrays.
9
How would you add Redis caching to your app?
Cache-aside pattern: on GET /boards/:id, check Redis first. Hit: return cached data. Miss: query MongoDB, store in Redis
with 5min TTL, return. On board update: delete Redis key. Session store: refresh tokens in Redis instead of MongoDB for
faster validation. Socket.io: Redis adapter for multi-instance pub/sub.
1
0
What would you do differently if building this for production?
1) Redis for caching and sessions. 2) Message queue (BullMQ) for emails and notifications. 3) Proper logging (Winston +
Datadog). 4) Comprehensive test suite (Jest + Supertest). 5) Rate limiting per user not just per IP. 6) CDN for all static
assets. 7) Separate microservices for notification and search at scale. 8) Kubernetes for container orchestration.
You have 6 years of React. You know MERN. You just needed a system. Now you have one.
Start Day 1 today. Say 'start Day 1' and get your boilerplate. You've got this.