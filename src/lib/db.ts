/**
 * CS Vertex - Database Schema and Supabase Client Integration Hub
 * 
 * This file serves as a ready-to-wire database stub containing our fully 
 * documented PostgreSQL schemas and Supabase JavaScript API client code.
 * 
 * To transition from client-side state (Zustand) to live persistence:
 * 1. Install Supabase client: `npm install @supabase/supabase-js`
 * 2. Un-comment the connection snippet below.
 * 3. Run the SQL table definitions in your PostgreSQL database terminal.
 */

// import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/*
================================================================================
PostgreSQL / Supabase Schema Definitions
================================================================================

-- 1. CLIENT PROJECTS SCHEMA
CREATE TABLE projects (
    id VARCHAR(12) PRIMARY KEY DEFAULT 'PRJ-' || floor(random() * 9000 + 1000)::text,
    client_name VARCHAR(100) NOT NULL,
    client_email VARCHAR(150) NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,
    price INT NOT NULL,
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status VARCHAR(25) DEFAULT 'Planning' CHECK (status IN ('Planning', 'Design', 'Development', 'QA Testing', 'Completed')),
    requirements_text TEXT DEFAULT '',
    requirements_url TEXT,
    submission_date DATE DEFAULT CURRENT_DATE,
    whatsapp_nudged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. GST INVOICES SCHEMA
CREATE TABLE invoices (
    id VARCHAR(15) PRIMARY KEY DEFAULT 'INV-2026-0' || floor(random() * 900 + 100)::text,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    items JSONB NOT NULL, -- Array containing [{name, qty, price, gstRate}]
    subtotal NUMERIC(12, 2) NOT NULL,
    cgst NUMERIC(10, 2) NOT NULL,
    sgst NUMERIC(10, 2) NOT NULL,
    total NUMERIC(12, 2) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Paid', 'Pending', 'Draft'))
);

-- 3. INVENTORY SERVICE CATALOG SCHEMA
CREATE TABLE inventory (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    min_stock INT NOT NULL DEFAULT 5,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. INTERNS PLATFORM SCHEMA
CREATE TABLE interns (
    id VARCHAR(10) PRIMARY KEY DEFAULT 'INT-' || floor(random() * 900 + 100)::text,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    college VARCHAR(150) NOT NULL,
    domain VARCHAR(50) NOT NULL CHECK (domain IN ('Frontend', 'Backend', 'AI & Automation')),
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Onboarding', 'Active', 'Completed')),
    resume_name VARCHAR(100),
    tasks JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array containing [{id, title, description, status, grade, deliverableUrl, deliverableNotes}]
    certificate_code VARCHAR(50) UNIQUE,
    certificate_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


================================================================================
Ready-to-Wire Client Query Snippets
================================================================================

-- FETCH PROJECTS
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

-- INSERT NEW CONTRACT SPECS
export async function insertProject(project) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select();
  if (error) throw error;
  return data[0];
}

-- SAVE GST INVOICE RECORD
export async function saveInvoice(invoice) {
  const { data, error } = await supabase
    .from('invoices')
    .insert([invoice])
    .select();
  if (error) throw error;
  return data[0];
}

-- DEDUCT STOCK DURING PURCHASE
export async function deductInventoryStock(itemId, quantity) {
  const { data, error } = await supabase.rpc('deduct_stock', {
    item_id: itemId,
    quantity_deducted: quantity
  });
  if (error) throw error;
  return data;
}

*/

export const mockDatabaseStatus = () => {
  return {
    connected: false,
    engine: 'PostgreSQL sandbox mode',
    sync: 'Active on browser local storage stubs',
    note: 'Wire connection securely by adding actual database URL in environment files'
  };
};
