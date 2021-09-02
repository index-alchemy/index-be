# acp-index

## vision
Index is a collaborative project-brainstorming app. It emphasizes simplicity and usability, from the data structure through to the user interface, to create a reliable, flexible tool. Index allows students to suggest and contribute to project pitches together and then pairs students up into teams to work on those projects based on student preferences.

## creators
Annaleigh Hickman
Austin Summerlin
Clem Hepburn
Culi Tif

## tech stack (back-end)
- Node.js
- Express
- postgreSql
- JWT
- Cors

## data structure
- users
  - id
  - name
  - email
  - cohort
  - password_hash
  - is_admin
  - created_at
 
- sprints
  - id
  - name
  - cohort
  - result
  - created_at

- pitches
  - id
  - user_id (references users(id))
  - sprint_id (references sprints(id))
  - pitch
  - description
  - created_at

- preferences
  - id
  - user_id (references users(id))
  - sprint_id (references sprints(id))
  - preference

- comments
  - id
  - user_id (references users(id))
  - pitch_id (references pitches(id))
  - comment
  - created_at

