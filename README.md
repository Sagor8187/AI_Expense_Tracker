AI Expense Tracker - Project Design & 4-Day Plan
Tech Stack: Next.js, TypeScript, Redux Toolkit, Express.js, MongoDB

1. Project Goal
Build a production-ready expense tracker where users manage income, expenses, budgets, and analytics.
2. Core Features
•	JWT Authentication (Register/Login)
•	Dashboard with summary cards
•	Add/Edit/Delete Income
•	Add/Edit/Delete Expense
•	Categories
•	Monthly analytics
•	Search, filter, pagination
•	Budget limit and warnings
•	Profile page
•	Responsive UI
3. System Workflow
1.	User registers or logs in.
2.	JWT is stored.
3.	Dashboard requests summary APIs.
4.	User adds income or expense.
5.	Backend validates data and saves to MongoDB.
6.	Dashboard refreshes totals.
7.	Analytics page aggregates monthly data.
4. Database Design
Users
- _id
- name
- email
- password
- avatar
- createdAt

Categories
- _id
- userId
- name
- type (income/expense)

Transactions
- _id
- userId
- categoryId
- type
- amount
- title
- note
- date

Budgets
- _id
- userId
- month
- amount

5. API Endpoints
•	POST /auth/register
•	POST /auth/login
•	GET /transactions
•	POST /transactions
•	PATCH /transactions/:id
•	DELETE /transactions/:id
•	GET /dashboard/summary
•	GET /analytics/monthly
•	GET /budgets
•	POST /budgets
6. Redux Structure
•	authSlice
•	transactionSlice
•	budgetSlice
•	dashboardSlice
•	api services
7. Folder Structure
client/
 app/
 components/
 redux/
 services/
 types/

server/
 controllers/
 routes/
 models/
 middleware/
 utils/

8. Four-Day Development Plan
•	Day 1: Setup project, authentication, MongoDB models, Redux auth, login/register UI.
•	Day 2: CRUD for transactions, category management, dashboard summary cards.
•	Day 3: Budget module, analytics APIs, charts, search/filter/pagination.
•	Day 4: Responsive polish, validation, testing, bug fixing, README, deployment.
9. Resume Highlights
•	Role-based architecture
•	JWT Authentication
•	Redux Toolkit state management
•	REST API
•	MongoDB Aggregation
•	Responsive UI
