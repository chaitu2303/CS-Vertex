import { create } from 'zustand';

export type UserRole = 'guest' | 'client' | 'intern' | 'admin' | 'billing' | 'contact' | 'feedback';

export interface Project {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  title: string;
  price: number;
  progress: number;
  status: 'Planning' | 'Design' | 'Development' | 'QA Testing' | 'Completed';
  requirementsText: string;
  requirementsUrl: string | null;
  submissionDate: string;
  whatsappNudged: boolean;
}

export interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
  gstRate: number; // e.g. 18 for 18%
}

export interface Invoice {
  id: string;
  customerName: string;
  customerPhone: string;
  items: InvoiceItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Draft';
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  minStock: number;
}

export interface InternTask {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Submitted' | 'Graded';
  grade: string | null;
  deliverableUrl: string | null;
  deliverableNotes: string | null;
}

export interface Intern {
  id: string;
  name: string;
  email: string;
  college: string;
  domain: 'Frontend' | 'Backend' | 'AI & Automation';
  status: 'Pending' | 'Onboarding' | 'Active' | 'Completed';
  resumeName: string;
  tasks: InternTask[];
  certificateCode: string | null;
  certificateDate: string | null;
}

export interface FeedbackItem {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  feedbackText: string;
  date: string;
}

interface GlobalState {
  role: UserRole;
  projects: Project[];
  invoices: Invoice[];
  inventory: InventoryItem[];
  interns: Intern[];
  feedbacks: FeedbackItem[];
  contactTab: 'consult' | 'intern';
  
  // Actions
  setRole: (role: UserRole) => void;
  setContactTab: (tab: 'consult' | 'intern') => void;
  addProject: (project: Omit<Project, 'id' | 'progress' | 'status' | 'requirementsText' | 'requirementsUrl' | 'submissionDate' | 'whatsappNudged'>) => void;
  updateProjectProgress: (id: string, progress: number, status: Project['status']) => void;
  uploadProjectRequirements: (id: string, text: string, url: string | null) => void;
  nudgeProject: (id: string) => void;
  
  addInvoice: (invoice: Omit<Invoice, 'id' | 'date'>) => string;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
  
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryStock: (id: string, newStock: number) => void;
  
  applyInternship: (intern: Omit<Intern, 'id' | 'status' | 'tasks' | 'certificateCode' | 'certificateDate'>) => void;
  updateInternStatus: (id: string, status: Intern['status']) => void;
  submitTask: (internId: string, taskId: string, url: string, notes: string) => void;
  gradeTask: (internId: string, taskId: string, grade: string) => void;
  issueCertificate: (internId: string, code: string) => void;
  addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'date'>) => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  role: 'guest',
  contactTab: 'consult',
  feedbacks: [
    {
      id: 'FB-101',
      customerName: 'Peela Arjuna Rao (DeshProperty)',
      rating: 5,
      feedbackText: 'CS Vertex built our property platform with incredible speed and flawless WhatsApp integration. Their automation systems have saved us countless operational hours. Highly recommended for growing businesses!',
      date: '2026-05-10'
    },
    {
      id: 'FB-102',
      customerName: 'Rajesh Thallapudi (FoodChain)',
      rating: 5,
      feedbackText: 'Working with CS Vertex was a game-changer for our logistics redistribution network. Their real-time mapping algorithms and robust backend architectures operate seamlessly at scale.',
      date: '2026-05-12'
    }
  ],
  
  // Empty seed data for projects
  projects: [],
  
  // Empty seed data for billing invoices
  invoices: [],
  
  // Empty seed data for billing system inventory
  inventory: [],
  
  // Empty seed data for internship platform
  interns: [],
  
  // Action implementers
  setRole: (role) => set({ role }),
  setContactTab: (contactTab) => set({ contactTab }),
  
  addProject: (p) => set((state) => {
    const newProject: Project = {
      ...p,
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      progress: 0,
      status: 'Planning',
      requirementsText: '',
      requirementsUrl: null,
      submissionDate: new Date().toISOString().split('T')[0],
      whatsappNudged: false,
    };
    return { projects: [newProject, ...state.projects] };
  }),
  
  updateProjectProgress: (id, progress, status) => set((state) => ({
    projects: state.projects.map((p) => p.id === id ? { ...p, progress, status } : p)
  })),
  
  uploadProjectRequirements: (id, text, url) => set((state) => ({
    projects: state.projects.map((p) => p.id === id ? { ...p, requirementsText: text, requirementsUrl: url, progress: Math.max(p.progress, 15) } : p)
  })),
  
  nudgeProject: (id) => set((state) => ({
    projects: state.projects.map((p) => p.id === id ? { ...p, whatsappNudged: true } : p)
  })),
  
  addInvoice: (inv) => {
    const newId = `INV-2026-0${get().invoices.length + 1}`;
    set((state) => {
      const newInvoice: Invoice = {
        ...inv,
        id: newId,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };
      return { invoices: [newInvoice, ...state.invoices] };
    });
    return newId;
  },
  
  updateInvoiceStatus: (id, status) => set((state) => ({
    invoices: state.invoices.map((inv) => inv.id === id ? { ...inv, status } : inv)
  })),
  
  addInventoryItem: (item) => set((state) => {
    const newItem: InventoryItem = {
      ...item,
      id: `INV-A${state.inventory.length + 1}`
    };
    return { inventory: [...state.inventory, newItem] };
  }),
  
  updateInventoryStock: (id, newStock) => set((state) => ({
    inventory: state.inventory.map((item) => item.id === id ? { ...item, stock: newStock } : item)
  })),
  
  applyInternship: (i) => set((state) => {
    const newIntern: Intern = {
      ...i,
      id: `INT-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Pending',
      resumeName: i.resumeName || 'uploaded_resume.pdf',
      tasks: [],
      certificateCode: null,
      certificateDate: null
    };
    return { interns: [newIntern, ...state.interns] };
  }),
  
  updateInternStatus: (id, status) => set((state) => {
    const defaultTasks: InternTask[] = [
      {
        id: 'TSK-01',
        title: 'Premium Glassmorphic Component Library',
        description: 'Design and code 5 reusable React components with glowing borders and clean Tailwind v4 setup.',
        status: 'To Do',
        grade: null,
        deliverableUrl: null,
        deliverableNotes: null
      },
      {
        id: 'TSK-02',
        title: 'Implement Framer Motion Nav Drawers',
        description: 'Build a slide-out navigation sheet with spring dynamics and full keyboard trapping layout.',
        status: 'To Do',
        grade: null,
        deliverableUrl: null,
        deliverableNotes: null
      },
      {
        id: 'TSK-03',
        title: 'Integrate Responsive Sidebar Layout',
        description: 'Build collapsible navigation grids adapting from mobile tab bar to floating desk drawers.',
        status: 'To Do',
        grade: null,
        deliverableUrl: null,
        deliverableNotes: null
      }
    ];
    
    return {
      interns: state.interns.map((intern) => {
        if (intern.id === id) {
          const tasks = intern.tasks.length === 0 && (status === 'Active' || status === 'Onboarding') ? defaultTasks : intern.tasks;
          return { ...intern, status, tasks };
        }
        return intern;
      })
    };
  }),
  
  submitTask: (internId, taskId, url, notes) => set((state) => ({
    interns: state.interns.map((intern) => {
      if (intern.id === internId) {
        return {
          ...intern,
          tasks: intern.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: 'Submitted', deliverableUrl: url, deliverableNotes: notes };
            }
            return task;
          })
        };
      }
      return intern;
    })
  })),
  
  gradeTask: (internId, taskId, grade) => set((state) => ({
    interns: state.interns.map((intern) => {
      if (intern.id === internId) {
        return {
          ...intern,
          tasks: intern.tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: 'Graded', grade };
            }
            return task;
          })
        };
      }
      return intern;
    })
  })),
  
  issueCertificate: (internId, code) => set((state) => ({
    interns: state.interns.map((intern) => {
      if (intern.id === internId) {
        return {
          ...intern,
          status: 'Completed',
          certificateCode: code,
          certificateDate: new Date().toISOString().split('T')[0]
        };
      }
      return intern;
    })
  })),
  
  addFeedback: (f) => set((state) => {
    const newFeedback: FeedbackItem = {
      ...f,
      id: `FB-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0]
    };
    return { feedbacks: [newFeedback, ...state.feedbacks] };
  })
}));
