'use client';

import React, { useState } from 'react';
import { useGlobalStore, InvoiceItem, Invoice } from '@/store/globalStore';
import { Card, Button, Badge } from './UiKit';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Plus, Trash2, Printer, CheckCircle2, AlertCircle, 
  Sparkles, Languages, Database, Landmark, Check, X, CreditCard, Activity
} from 'lucide-react';

export const BillingView: React.FC = () => {
  const { invoices, addInvoice, inventory, updateInventoryStock } = useGlobalStore();
  
  // Invoice state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { name: 'Standard Next.js Dev Node', qty: 1, price: 25000, gstRate: 0 }
  ]);

  const [activeTab, setActiveTab] = useState<'create' | 'inventory' | 'history'>('create');
  const [bilingualEnglish, setBilingualEnglish] = useState(true);

  // NLP input state
  const [aiBillingInput, setAiBillingInput] = useState('');
  const [aiParseAlert, setAiParseAlert] = useState<string | null>(null);

  // Active Receipt modal
  const [thermalInvoice, setThermalInvoice] = useState<Invoice | null>(null);
  const [whatsappDeliveryMessage, setWhatsappDeliveryMessage] = useState<string | null>(null);

  const calculateInvoiceSummaries = () => {
    let subtotal = 0;
    invoiceItems.forEach((item) => {
      subtotal += item.qty * item.price;
    });
    const cgst = 0;
    const sgst = 0;
    const total = subtotal;
    return { subtotal, cgst, sgst, total };
  };

  const { subtotal, total } = calculateInvoiceSummaries();

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { name: '', qty: 1, price: 0, gstRate: 0 }]);
  };

  const handleRemoveItem = (idx: number) => {
    if (invoiceItems.length === 1) return;
    setInvoiceItems(invoiceItems.filter((_, i) => i !== idx));
  };

  const handleItemChange = (idx: number, field: keyof InvoiceItem, val: string | number) => {
    setInvoiceItems(
      invoiceItems.map((item, i) => {
        if (i === idx) {
          return { ...item, [field]: val };
        }
        return item;
      })
    );
  };

  // Conversational AI NLP Parser
  const handleAiBillingParse = () => {
    if (!aiBillingInput.trim()) return;

    const query = aiBillingInput.toLowerCase();
    let name = 'Kiran Kumar';
    let service = 'Custom Cloud Server Setup';
    let price = 15000;
    const qty = 1;

    const nameMatch = query.match(/(?:bill|charge|invoice|for|customer|to)\s+([a-zA-Z\s]{3,15})(?:\s+for|\s+at|\s+₹|\s+rs|\s+\d|\s+and|$)/);
    if (nameMatch && nameMatch[1]) {
      name = nameMatch[1].trim().replace(/\b\w/g, c => c.toUpperCase());
    }

    if (query.includes('chatbot') || query.includes('assistant') || query.includes('చాట్‌బాట్')) {
      service = 'AI Multi-Agent Chatbot Node';
      price = 40000;
    } else if (query.includes('website') || query.includes('వెబ్')) {
      service = 'Custom Premium Web Platform';
      price = 25000;
    } else if (query.includes('domain') || query.includes('ssl')) {
      service = 'Dedicated SSL & Custom Domain (.com)';
      price = 1500;
    } else if (query.includes('whatsapp') || query.includes('వాట్సాప్')) {
      service = 'WhatsApp API Broadcast Portal';
      price = 15000;
    }

    const priceMatch = query.match(/(?:rs|₹|at|value|of|\$)\s*(\d+)/);
    const numMatch = query.match(/\b(\d{4,6})\b/);
    if (priceMatch && priceMatch[1]) {
      price = parseInt(priceMatch[1]);
    } else if (numMatch && numMatch[1]) {
      price = parseInt(numMatch[1]);
    }

    setCustomerName(name);
    setCustomerPhone('9955448822');
    setInvoiceItems([{ name: service, qty, price, gstRate: 0 }]);
    
    setAiParseAlert(`Parsed Customer "${name}", Item "${service}", Price ₹${price}. Form populated!`);
    setAiBillingInput('');
    setTimeout(() => setAiParseAlert(null), 3000);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const { subtotal: sub, total: tot } = calculateInvoiceSummaries();
    
    const newInvoiceId = addInvoice({
      customerName,
      customerPhone,
      items: invoiceItems,
      subtotal: sub,
      cgst: 0,
      sgst: 0,
      total: tot,
      status: 'Paid',
    });

    invoiceItems.forEach(item => {
      const match = inventory.find(inv => inv.name.toLowerCase() === item.name.toLowerCase());
      if (match) {
        updateInventoryStock(match.id, Math.max(0, match.stock - item.qty));
      }
    });

    const draftInvoice: Invoice = {
      id: newInvoiceId,
      customerName,
      customerPhone,
      items: invoiceItems,
      subtotal: sub,
      cgst: 0,
      sgst: 0,
      total: tot,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Paid'
    };

    setThermalInvoice(draftInvoice);

    const itemsDetails = invoiceItems.map(item => `- ${item.name} x${item.qty}: ₹${(item.qty * item.price).toLocaleString('en-IN')}`).join('\n');
    setWhatsappDeliveryMessage(
      `*CS VERTEX SMART INVOICE*\n\nDear ${customerName},\nYour invoice *${newInvoiceId}* has been generated successfully.\n\n*Items:*\n${itemsDetails}\n\n*Total Amount:* ₹${tot.toLocaleString('en-IN')}\n\nDownload: https://csvertex.com/receipt/${newInvoiceId}`
    );

    setCustomerName('');
    setCustomerPhone('');
    setInvoiceItems([{ name: 'Standard Next.js Dev Node', qty: 1, price: 25000, gstRate: 0 }]);
  };

  const handleTriggerPrint = () => {
    if (typeof window === 'undefined') return;
    document.body.classList.add('thermal-print-active');
    window.print();
    document.body.classList.remove('thermal-print-active');
  };

  return (
    <div className="relative min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-silver-white bg-[#050505]">
      
      {/* Background spotlights & grids */}
      <div className="fine-grid-texture animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="ambient-glow-blue top-[15%] right-[20%] w-[500px] h-[500px]" />
      <div className="ambient-glow-cyan bottom-[10%] left-[10%] w-[500px] h-[500px]" />

      {/* Tabs Header row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 border-b border-white/5 pb-5 gap-4 z-10 relative">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
            SMART BILLING AND LEDGER SYSTEM
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sora text-white mt-1">Smart Invoicing Operations</h2>
        </div>

        <div className="flex gap-2 bg-neutral-950 border border-white/5 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-sora select-none cursor-pointer transition-colors ${
              activeTab === 'create' ? 'bg-gradient-to-r from-electric-blue to-cyan-glow text-white font-bold shadow-md shadow-cyan-glow/10' : 'text-silver-white/40 hover:text-white'
            }`}
          >
            Create Invoice
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-sora select-none cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'inventory' ? 'bg-gradient-to-r from-electric-blue to-cyan-glow text-white font-bold shadow-md shadow-cyan-glow/10' : 'text-silver-white/40 hover:text-white'
            }`}
          >
            Resource Stock Sheet
            {inventory.some(item => item.stock <= item.minStock) && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-sora select-none cursor-pointer transition-colors ${
              activeTab === 'history' ? 'bg-gradient-to-r from-electric-blue to-cyan-glow text-white font-bold shadow-md shadow-cyan-glow/10' : 'text-silver-white/40 hover:text-white'
            }`}
          >
            Invoice Registry
          </button>
        </div>
      </div>

      {/* CREATE TAB */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative">
          
          {/* Invoicer Column */}
          <div className="lg:col-span-8">
            <Card glow="cyan" className="p-6 md:p-8 bg-[#0b1120]/15 backdrop-blur-xl border border-white/5">
              
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <span className="text-[10px] font-mono tracking-wider text-[#38BDF8] uppercase font-bold flex items-center gap-2">
                  <Languages className="w-4 h-4 animate-spin text-[#38BDF8]" style={{ animationDuration: '8s' }} />
                  {bilingualEnglish ? 'Digital Invoicing Ledger (English / తెలుగు)' : 'స్మార్ట్ డిజిటల్ బిల్లింగ్ (తెలుగు / English)'}
                </span>

                <button
                  onClick={() => setBilingualEnglish(!bilingualEnglish)}
                  className="text-xs bg-neutral-950 border border-white/5 hover:border-cyan-glow/30 text-silver-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  🗣️ {bilingualEnglish ? 'Convert to Telugu Layout' : 'Convert to English Layout'}
                </button>
              </div>

              {/* AI Conversational Bill builder */}
              <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4.5 mb-6">
                <div className="flex items-center gap-2 text-[10px] font-bold font-sora text-[#38BDF8] mb-2 uppercase tracking-widest font-mono">
                  <Sparkles className="w-4 h-4 text-cyan-glow animate-pulse" />
                  <span>{bilingualEnglish ? 'AI Conversational Invoice Parser' : 'AI స్మార్ట్ వాయిస్ & టెక్స్ట్ బిల్డింగ్ అసిస్టెంట్'}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiBillingInput}
                    onChange={(e) => setAiBillingInput(e.target.value)}
                    placeholder={bilingualEnglish ? 'e.g. "Bill Kalyan 40000 for standard website with 12 months support"' : 'ఉదాహరణ: "శ్రీనివాస రావు కు 25000 కి వెబ్‌సైట్ బిల్ చేయండి"'}
                    className="flex-1 bg-neutral-950 text-silver-white placeholder:text-silver-white/20 border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-cyan-glow/40 transition-colors"
                  />
                  <Button variant="neon" size="sm" onClick={handleAiBillingParse} className="text-xs">
                    Parse Node
                  </Button>
                </div>
                {aiParseAlert && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-emerald-400 mt-2 font-mono flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4" />
                    {aiParseAlert}
                  </motion.div>
                )}
              </div>

              {/* Main Invoice Forms */}
              <form onSubmit={handleCreateInvoice} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-silver-white/40 uppercase mb-1.5 font-sora">
                      {bilingualEnglish ? 'Customer / Client Name' : 'ఖాతాదారుని పేరు (Customer Name)'}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter customer name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-neutral-950/80 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-glow/40 transition-colors"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-silver-white/40 uppercase mb-1.5 font-sora">
                      {bilingualEnglish ? 'Mobile / WhatsApp Number' : 'వాట్సాప్ మొబైల్ నెంబర్ (WhatsApp Phone)'}
                    </label>
                    <input
                      type="text"
                      placeholder="91XXXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="bg-neutral-950/80 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-glow/40 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Bill line items */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-silver-white/40 font-mono">
                      {bilingualEnglish ? 'Billable Items Lines' : 'బిల్ చేయవలసిన అంశాలు'}
                    </span>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="text-xs text-[#38BDF8] hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-sora font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Bill Item
                    </button>
                  </div>

                  {invoiceItems.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-4 items-end bg-white/[0.01] p-4 rounded-xl border border-white/5">
                      
                      {/* Name input */}
                      <div className="col-span-12 sm:col-span-5 flex flex-col">
                        <label className="text-[9px] font-bold text-silver-white/30 uppercase mb-1 font-mono">PRODUCT NAME / SERVICE</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                          placeholder="e.g. Next.js Web Platform Node"
                          className="w-full bg-neutral-950 text-white border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-glow/40 transition-colors"
                          required
                        />
                      </div>

                      {/* Quantity */}
                      <div className="col-span-4 sm:col-span-2 flex flex-col">
                        <label className="text-[9px] font-bold text-silver-white/30 uppercase mb-1 font-mono text-center">QTY</label>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleItemChange(idx, 'qty', parseInt(e.target.value) || 1)}
                          className="w-full bg-neutral-950 text-white border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none text-center focus:border-cyan-glow/40 transition-colors"
                          required
                        />
                      </div>

                      {/* Price */}
                      <div className="col-span-5 sm:col-span-3 flex flex-col">
                        <label className="text-[9px] font-bold text-silver-white/30 uppercase mb-1 font-mono">PRICE (₹)</label>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)}
                          className="w-full bg-neutral-950 text-white border border-white/5 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-cyan-glow/40 transition-colors"
                          required
                        />
                      </div>

                      {/* Delete */}
                      <div className="col-span-3 sm:col-span-2 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-2 text-red-400 bg-red-950/20 hover:bg-red-500 hover:text-white rounded-lg border border-red-500/20 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                <Button type="submit" variant="neon" size="sm" fullWidth className="font-sora text-xs py-3.5">
                  {bilingualEnglish ? 'Generate Smart Invoice & Trigger Print' : 'ఇన్వాయిస్ సేవ్ చేయండి & రసీదు ముద్రించండి'}
                </Button>
              </form>

            </Card>
          </div>

          {/* live summary column Right */}
          <div className="lg:col-span-4">
            <Card glow="blue" className="p-6 md:p-8 bg-[#0b1120]/15 backdrop-blur-xl border border-white/5 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase font-bold">LIVE VALUATION DRAFT</span>
                <h3 className="font-sora font-extrabold text-base text-white mt-1 mb-6">Valuation Matrix</h3>

                <div className="space-y-4 border-b border-white/5 pb-6">
                  <div className="flex justify-between text-xs text-silver-white/40 font-mono font-bold">
                    <span>{bilingualEnglish ? 'Subtotal Value' : 'మొత్తం ధర'}:</span>
                    <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-silver-white/30 font-mono font-bold">
                    <span>{bilingualEnglish ? 'SLA Maintenance (12 Months)' : 'నిర్వహణ (1 సంవత్సరం)'}:</span>
                    <span className="text-emerald-400">Included (₹0)</span>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold font-sora text-white">{bilingualEnglish ? 'Estimated Total' : 'మొత్తం బిల్లు'}:</span>
                    <span className="text-xl sm:text-2xl font-extrabold font-sora text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.2)] px-2 rounded">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-neutral-950 border border-white/5 p-4 rounded-xl text-xs space-y-3.5">
                <span className="font-bold text-[#38BDF8] block uppercase font-mono text-[9px] tracking-wider">💡 Real-time Ledger Notes:</span>
                <p className="text-silver-white/40 leading-relaxed font-sans font-medium">
                  Billing items deduction works live against catalog sheets, refreshing stock metrics in Admin terminal immediately.
                </p>
              </div>
            </Card>
          </div>

        </div>
      )}

      {/* INVENTORY TAB */}
      {activeTab === 'inventory' && (
        <Card className="p-6 md:p-8 bg-[#0b1120]/15 backdrop-blur-xl border border-white/5 z-10 relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase font-bold">SYSTEM CATALOG STOCK</span>
              <h3 className="font-sora font-extrabold text-lg text-white mt-1">Core Hardware & Service Nodes Inventory</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#030303] text-silver-white/30 uppercase tracking-widest font-mono border-b border-white/5">
                <tr>
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">SKU</th>
                  <th className="p-3.5">Unit Price</th>
                  <th className="p-3.5 text-center">Stock Level</th>
                  <th className="p-3.5 text-center">Threshold Alert</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inventory.map((item) => {
                  const isLow = item.stock <= item.minStock;
                  return (
                    <tr key={item.id} className={`transition-colors hover:bg-white/2 ${isLow ? 'bg-red-950/10' : ''}`}>
                      <td className="p-3.5 font-semibold text-white">{item.name}</td>
                      <td className="p-3.5 font-mono text-silver-white/40">{item.sku}</td>
                      <td className="p-3.5 font-mono text-silver-white/70">₹{item.price.toLocaleString('en-IN')}</td>
                      <td className="p-3.5 text-center font-mono font-bold text-white">{item.stock}</td>
                      <td className="p-3.5 text-center">
                        {isLow ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold font-sora bg-red-950 text-red-400 border border-red-500/30 animate-pulse">
                            ⚠️ Stock Depleted
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold font-sora bg-emerald-950 text-emerald-400 border border-emerald-500/20">
                            ✓ Healthy
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <Button
                          variant="glass"
                          size="xs"
                          onClick={() => updateInventoryStock(item.id, item.stock + 20)}
                          className="text-[10px] font-semibold py-1.5 font-sora hover:bg-[#38BDF8] hover:text-black cursor-pointer"
                        >
                          Restock +20
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* BILL HISTORY REGISTER TAB */}
      {activeTab === 'history' && (
        <Card className="p-6 md:p-8 bg-[#0b1120]/15 backdrop-blur-xl border border-white/5 z-10 relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase font-bold">LEDGER JOURNAL HISTORY</span>
              <h3 className="font-sora font-extrabold text-lg text-white mt-1">Invoice Registers Logs</h3>
            </div>
          </div>

          {invoices.length === 0 ? (
            <p className="text-xs text-silver-white/30 text-center py-8 italic">No transaction records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#030303] text-silver-white/30 uppercase tracking-widest font-mono border-b border-white/5">
                  <tr>
                    <th className="p-3.5">Invoice Code</th>
                    <th className="p-3.5">Customer Client</th>
                    <th className="p-3.5">Generated Date</th>
                    <th className="p-3.5">Amount total</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="transition-colors hover:bg-white/2">
                      <td className="p-3.5 font-mono text-white font-bold">{inv.id}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{inv.customerName}</div>
                        <div className="text-[10px] text-silver-white/40">{inv.customerPhone}</div>
                      </td>
                      <td className="p-3.5 font-mono text-silver-white/40">{inv.date}</td>
                      <td className="p-3.5 font-mono text-silver-white/70 font-bold">₹{inv.total.toLocaleString('en-IN')}</td>
                      <td className="p-3.5">
                        <Badge status={inv.status} variant={inv.status === 'Paid' ? 'green' : 'yellow'} />
                      </td>
                      <td className="p-3.5 text-right">
                        <Button
                          variant="glass"
                          size="xs"
                          onClick={() => setThermalInvoice(inv)}
                          className="text-[10px] font-semibold py-1.5 font-sora cursor-pointer"
                        >
                          Open Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* --- THERMAL RECEIPT DIALOG MODAL (80mm cash register receipt rendering) --- */}
      <dialog 
        open={!!thermalInvoice} 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-sm select-text w-full h-full"
      >
        {thermalInvoice && (
          <div className="relative w-full max-w-[340px] bg-white text-black border border-neutral-300 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden z-10 p-5 font-mono text-xs max-h-[90vh] flex flex-col justify-between">
            
            {/* Header / close controls */}
            <div className="flex justify-between items-center no-print border-b border-neutral-200 pb-2 mb-3">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 font-mono">80mm Smart Receipt Preview</span>
              <button 
                onClick={() => setThermalInvoice(null)} 
                className="text-neutral-400 hover:text-black cursor-pointer p-1 rounded hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core receipt printable segment */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="text-center">
                <span className="text-lg font-extrabold tracking-widest font-sora block text-black">CS VERTEX</span>
                <span className="text-[9px] block uppercase text-neutral-500">“Build Beyond Limits”</span>
                <span className="text-[9px] block text-neutral-400">HITEC City, Hyderabad, India</span>
              </div>

              <div className="my-3 border-t border-dashed border-neutral-400" />

              <div className="space-y-1 text-[10px] text-neutral-600">
                <div>Receipt: <strong className="text-black">{thermalInvoice.id}</strong></div>
                <div>Date: {thermalInvoice.date}</div>
                <div>Client: {thermalInvoice.customerName}</div>
                <div>Phone: {thermalInvoice.customerPhone}</div>
              </div>

              <div className="my-3 border-t border-dashed border-neutral-400" />

              {/* Items Table */}
              <div className="space-y-2">
                <div className="grid grid-cols-12 font-bold text-black text-[10px]">
                  <span className="col-span-7">Description</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-3 text-right">Amt</span>
                </div>
                {thermalInvoice.items.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 text-[10px] text-neutral-700 leading-tight">
                    <span className="col-span-7">{item.name}</span>
                    <span className="col-span-2 text-center">{item.qty}</span>
                    <span className="col-span-3 text-right">₹{(item.qty * item.price).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="my-3 border-t border-dashed border-neutral-400" />

              {/* Invoicing calculation */}
              <div className="space-y-1 text-[10px] text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{thermalInvoice.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax & Duties (0%):</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between font-bold text-black text-xs pt-1.5 border-t border-neutral-200">
                  <span>TOTAL AMOUNT:</span>
                  <span>₹{thermalInvoice.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="my-3 border-t border-dashed border-neutral-400" />

              {/* UPI QR and payment instructions */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="w-24 h-24 bg-neutral-100 border border-neutral-300 rounded-lg p-2 flex items-center justify-center relative">
                  {/* Mimic QR Code vector */}
                  <div className="w-20 h-20 bg-neutral-900" style={{
                    clipPath: 'polygon(0 0, 40% 0, 40% 40%, 0 40%, 0 0, 60% 0, 100% 0, 100% 40%, 60% 40%, 60% 0, 0 60%, 40% 60%, 40% 100%, 0 100%, 0 60%, 60% 60%, 100% 60%, 100% 100%, 60% 100%, 60% 60%)'
                  }} />
                  <div className="absolute inset-0 m-auto w-6 h-6 bg-white border border-neutral-300 rounded flex items-center justify-center text-[7px] font-extrabold text-black tracking-tighter">
                    CS V
                  </div>
                </div>
                <span className="text-[8px] font-bold text-neutral-500 mt-2 block uppercase text-center">Scan QR to pay UPI transaction</span>
                <span className="text-[8px] text-neutral-400 mt-0.5 text-center block leading-relaxed">Smart Digital Receipts system.</span>
              </div>

              <div className="text-center text-[8px] text-neutral-400 border-t border-neutral-100 pt-3">
                Thank you! Build Beyond Limits.
              </div>
            </div>

            {/* Print trigger operations */}
            <div className="mt-4 no-print space-y-2">
              <Button variant="solid" fullWidth size="sm" onClick={handleTriggerPrint} className="gap-1.5 text-xs font-sora py-2.5">
                <Printer className="w-3.5 h-3.5" />
                Trigger Hardware Print (80mm)
              </Button>
              <Button variant="glass" fullWidth size="sm" onClick={() => {
                setThermalInvoice(null);
                if (whatsappDeliveryMessage) {
                  alert(`WhatsApp Delivery simulated sent successfully! Contents logged: \n\n${whatsappDeliveryMessage}`);
                }
              }} className="text-xs">
                Deliver Bill via WhatsApp
              </Button>
            </div>

          </div>
        )}
      </dialog>

    </div>
  );
};
