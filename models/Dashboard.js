const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Dashboard Schema
const DashboardSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    min: 2,
    max: 40
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = Dashboard = mongoose.model("dashboard", DashboardSchema);

// Admin_role = true
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYmM4MTNmNDg1ZDI0NWNmMjNkYzIxYiIsImVtYWlsIjoibWF4QG1heGFsdGVuYS5jb20iLCJ1c2VybmFtZSI6Im1heGFsdGVuYSIsIm5hbWUiOiJNYXggQWx0ZW5hIiwiYXZhdGFyIjoiLy93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8yYmQ0MzE5NTNkNWZkYmY1YmMyNDVkY2UxMjk0NGE5Yj9zPTIwMCZyPXBnJmQ9bW0iLCJhZG1pbl9yb2xlIjp0cnVlLCJpYXQiOjE1MzkxMTg3NzF9.I2IZRUGxUgilKKU5xdluASDSlhR_nogUjL03WqS5ur0

// Admin_role = false
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYmRiZTE3ZGZkY2RmNjczOWM4ODk4NCIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJuYW1lIjoiSm9obm55IERvZSIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvMjlhMWRmNDY0NmNiMzQxN2MxOTk5NGE1OWEzZTAyMmE_cz0yMDAmcj1wZyZkPW1tIiwiYWRtaW5fcm9sZSI6ZmFsc2UsImlhdCI6MTUzOTE3MzQxMX0.eFZghh7XKVbxZiaouyf6UkUJq9_rAM6FroK0R39hNEM
