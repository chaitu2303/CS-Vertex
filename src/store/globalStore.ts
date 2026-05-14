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
    { id: 'FB-001', customerName: 'Srinivas Rao', rating: 5, feedbackText: 'Outstanding UI design and lightning fast APIs. Highly recommended!', date: '2026-05-11' },
    { id: 'FB-002', customerName: 'Nisha Sharma', rating: 5, feedbackText: 'The AI medical chatbot handles queries with zero latency. Incredible work!', date: '2026-05-10' }
  ],
  
  // Realistic seed data for projects
  projects: [
    {
      id: 'PRJ-8821',
      clientName: 'Srinivas Rao',
      clientEmail: 'srinivas@vignafoods.com',
      serviceType: 'Website & E-Commerce',
      title: 'Vigna Foods Retail Ecosystem',
      price: 145000,
      progress: 65,
      status: 'Development',
      requirementsText: 'Need an online payment integrated organic storefront with WhatsApp alerts on checkout. High-speed performance is crucial.',
      requirementsUrl: 'vigna_spec_v1.pdf',
      submissionDate: '2026-05-02',
      whatsappNudged: false,
    },
    {
      id: 'PRJ-4439',
      clientName: 'Nisha Sharma',
      clientEmail: 'nisha@vertexcare.in',
      serviceType: 'AI Chatbot',
      title: 'VertexCare Medical Triage Bot',
      price: 210000,
      progress: 90,
      status: 'QA Testing',
      requirementsText: 'Smart diagnostic agent reading lab reports and booking clinical slots. Needs absolute data security and zero latency.',
      requirementsUrl: 'vertexcare_spec.pdf',
      submissionDate: '2026-04-28',
      whatsappNudged: false,
    },
    {
      id: 'PRJ-1022',
      clientName: 'Rahul Reddy',
      clientEmail: 'rahul@reddyfinance.co',
      serviceType: 'WhatsApp Automation',
      title: 'ReddyFinance Loan Alerts Gate',
      price: 85000,
      progress: 25,
      status: 'Design',
      requirementsText: 'Automatic payment tracking alerts sent direct to loan holders on dynamic triggers.',
      requirementsUrl: null,
      submissionDate: '2026-05-10',
      whatsappNudged: false,
    }
  ],
  
  // Seed data for billing invoices
  invoices: [
    {
      id: 'INV-2026-001',
      customerName: 'Kalyan Chakravarthy',
      customerPhone: '9848022338',
      items: [
        { name: 'Ultra Web Hosting Pack', qty: 1, price: 12000, gstRate: 0 },
        { name: 'Custom Domain Setup (.com)', qty: 1, price: 1500, gstRate: 0 }
      ],
      subtotal: 13500,
      cgst: 0,
      sgst: 0,
      total: 13500,
      date: '2026-05-08 14:32',
      status: 'Paid'
    },
    {
      id: 'INV-2026-002',
      customerName: 'Anitha Reddy',
      customerPhone: '9440112233',
      items: [
        { name: 'WhatsApp Business API Setup', qty: 1, price: 25000, gstRate: 0 },
        { name: 'Monthly Message Credit Package', qty: 2, price: 5000, gstRate: 0 }
      ],
      subtotal: 35000,
      cgst: 0,
      sgst: 0,
      total: 35000,
      date: '2026-05-11 10:15',
      status: 'Pending'
    },
    {
      id: 'INV-2026-003',
      customerName: 'Sai Kumar',
      customerPhone: '8885552323',
      items: [
        { name: 'AI Assistant Core Node Integration', qty: 1, price: 80000, gstRate: 0 }
      ],
      subtotal: 80000,
      cgst: 0,
      sgst: 0,
      total: 80000,
      date: '2026-05-12 18:24',
      status: 'Draft'
    }
  ],
  
  // Seed data for billing system inventory
  inventory: [
    { id: 'INV-A1', name: 'Premium Cloud Server Node', sku: 'SVR-CLD-PRM', price: 15000, stock: 45, minStock: 10 },
    { id: 'INV-A2', name: 'WhatsApp API Message Credits (5k Pack)', sku: 'WAP-MSG-5K', price: 4500, stock: 120, minStock: 25 },
    { id: 'INV-A3', name: 'Dedicated AI Inference Core (T4)', sku: 'AI-INF-T4', price: 42000, stock: 4, minStock: 5 }, // Low Stock Trigger
    { id: 'INV-A4', name: 'SSL Security Certificate Tier-3', sku: 'SSL-SEC-T3', price: 2500, stock: 85, minStock: 15 },
    { id: 'INV-A5', name: 'Thermal Receipt Print Paper Roll (80mm)', sku: 'THM-RLL-80', price: 120, stock: 4, minStock: 15 } // Low Stock Trigger
  ],
  
  // Seed data for internship platform
  interns: [
    {
      id: 'INT-552',
      name: 'Venkata Sai Teja',
      email: 'saiteja.v@jntu.edu',
      college: 'JNTU Hyderabad',
      domain: 'Frontend',
      status: 'Active',
      resumeName: 'sai_teja_frontend_cv.pdf',
      tasks: [
        {
          id: 'TSK-01',
          title: 'Premium Glassmorphic Component Library',
          description: 'Design and code 5 reusable React components with glowing borders and clean Tailwind v4 setup.',
          status: 'Graded',
          grade: 'A+',
          deliverableUrl: 'github.com/saiteja/glass-ui',
          deliverableNotes: 'Implemented responsive layouts with strict HSL variables. Interactive previews included.'
        },
        {
          id: 'TSK-02',
          title: 'Implement Framer Motion Nav Drawers',
          description: 'Build a slide-out navigation sheet with spring dynamics and full keyboard trapping layout.',
          status: 'Submitted',
          grade: null,
          deliverableUrl: 'github.com/saiteja/motion-drawers',
          deliverableNotes: 'Finished with spring damping. Tested across Edge and Safari mobile viewports.'
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
      ],
      certificateCode: null,
      certificateDate: null
    },
    {
      id: 'INT-331',
      name: 'Pranitha Reddy',
      email: 'pranitha.r@gitam.edu',
      college: 'GITAM Visakhapatnam',
      domain: 'AI & Automation',
      status: 'Completed',
      resumeName: 'pranitha_ai_cv.pdf',
      tasks: [
        {
          id: 'TSK-11',
          title: 'Gemini Billing Text Structured Parser Node',
          description: 'Construct a serverless handler using system instruction prompts to map conversational text into JSON invoice lines.',
          status: 'Graded',
          grade: 'O (Outstanding)',
          deliverableUrl: 'github.com/pranitha/ai-billing-parser',
          deliverableNotes: 'Created using Gemini-3-Flash. Supports flat-pricing invoicing calculations directly in the regex tokenizer.'
        },
        {
          id: 'TSK-12',
          title: 'Telugu Audio-to-Text Pipeline Integration',
          description: 'Integrate Web Speech Recognition API with active Telugu locale mapping and Telugu query parsing rules.',
          status: 'Graded',
          grade: 'A',
          deliverableUrl: 'github.com/pranitha/telugu-speech-billing',
          deliverableNotes: 'Connected voice captures to command token mapping. Recognizes key items successfully.'
        }
      ],
      certificateCode: 'CSV-CERT-88491-REDDY',
      certificateDate: '2026-05-10'
    },
    {
      id: 'INT-102',
      name: 'Aditya Vardhan',
      email: 'aditya.v@nitw.ac.in',
      college: 'NIT Warangal',
      domain: 'Backend',
      status: 'Pending',
      resumeName: 'aditya_backend_eng.pdf',
      tasks: [],
      certificateCode: null,
      certificateDate: null
    }
  ],
  
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
