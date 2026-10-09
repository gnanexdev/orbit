import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { AppProvider } from './context/AppContext';
import { AgentWorkspace } from './pages/AgentWorkspace';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Memory } from './pages/Memory';
import { NewTask } from './pages/NewTask';
import { Profile } from './pages/Profile';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';
import { Register } from './pages/Register';
import { Settings } from './pages/Settings';
import { Tasks } from './pages/Tasks';
import { Tools } from './pages/Tools';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="task/new" element={<NewTask />} />
            <Route path="task/:id" element={<AgentWorkspace />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="memory" element={<Memory />} />
            <Route path="tools" element={<Tools />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
