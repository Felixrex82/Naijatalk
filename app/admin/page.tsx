'use client'

import { useState } from 'react'
import { Lock, Plus, Check, AlertCircle } from 'lucide-react'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'nigeria2027admin'

type Tab = 'candidate' | 'claim' | 'link'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [tab, setTab] = useState<Tab>('candidate')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
    } else {
      setPwErr(true)
      setTimeout(() => setPwErr(false), 2000)
    }
  }

  const post = async (endpoint: string, body: object) => {
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setStatus('success')
      setMessage(data.id ? `Created with ID: ${data.id}` : 'Created successfully.')
    } catch (e: any) {
      setStatus('error')
      setMessage(e.message)
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-24">
        <div className="surface p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={18} className="text-[#22d3a5]" />
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
          </div>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password"
            className={`w-full bg-[#0a0a0f] border px-4 py-3 rounded-lg text-sm text-white mb-4 focus:outline-none focus:border-[#22d3a5] transition-colors ${
              pwErr ? 'border-red-500' : 'border-[#2a2a38]'
            }`}
          />
          {pwErr && <p className="text-red-400 text-xs mb-4">Incorrect password.</p>}
          <button onClick={handleLogin} className="btn-primary w-full">
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="section-heading mb-2">Admin Panel</p>
        <h1 className="text-2xl font-bold text-white">Data Management</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[#1a1a24] pb-4">
        {(['candidate', 'claim', 'link'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setStatus('idle') }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              tab === t ? 'bg-[#1a1a24] text-white' : 'text-[#55556a] hover:text-white'
            }`}
          >
            Add {t}
          </button>
        ))}
      </div>

      {/* Status */}
      {status !== 'idle' && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-6 text-sm ${
          status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
          status === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
          'bg-[#1a1a24] text-[#8888aa]'
        }`}>
          {status === 'success' ? <Check size={15} /> : <AlertCircle size={15} />}
          {status === 'loading' ? 'Saving...' : message}
        </div>
      )}

      {tab === 'candidate' && <CandidateForm onSubmit={(d) => post('candidates', d)} />}
      {tab === 'claim' && <ClaimForm onSubmit={(d) => post('claims', d)} />}
      {tab === 'link' && <LinkForm onSubmit={(d) => post('claims/links', d)} />}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-[#55556a] mb-2 font-medium">{label}</label>
      {children}
    </div>
  )
}

const inputCls = 'w-full bg-[#0a0a0f] border border-[#2a2a38] px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:border-[#22d3a5] transition-colors'
const selectCls = `${inputCls} cursor-pointer`

function CandidateForm({ onSubmit }: { onSubmit: (d: object) => void }) {
  const [form, setForm] = useState({ name: '', slug: '', party: '', age: '', state_of_origin: '', description: '', image_url: '' })
  const set = (k: string) => (e: any) => setForm((p) => ({ ...p, [k]: e.target.value }))

  return (
    <div className="surface p-6 space-y-5">
      <h2 className="font-semibold text-white">New Candidate</h2>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Full Name"><input className={inputCls} value={form.name} onChange={set('name')} placeholder="Bola Ahmed Tinubu" /></Field>
        <Field label="Slug"><input className={inputCls} value={form.slug} onChange={set('slug')} placeholder="tinubu" /></Field>
        <Field label="Party"><input className={inputCls} value={form.party} onChange={set('party')} placeholder="APC" /></Field>
        <Field label="Age"><input className={inputCls} type="number" value={form.age} onChange={set('age')} /></Field>
        <Field label="State of Origin"><input className={inputCls} value={form.state_of_origin} onChange={set('state_of_origin')} /></Field>
        <Field label="Image URL"><input className={inputCls} value={form.image_url} onChange={set('image_url')} placeholder="/candidates/tinubu.jpg" /></Field>
      </div>
      <Field label="Description">
        <textarea className={inputCls} rows={3} value={form.description} onChange={set('description')} />
      </Field>
      <button onClick={() => onSubmit({ ...form, age: Number(form.age) })} className="btn-primary flex items-center gap-2">
        <Plus size={14} /> Save Candidate
      </button>
    </div>
  )
}

function ClaimForm({ onSubmit }: { onSubmit: (d: object) => void }) {
  const [form, setForm] = useState({
    candidate_id: '', type: 'strength', title: '', description: '', category: 'economy',
    credibility_score: '7', weight: '3',
  })
  const set = (k: string) => (e: any) => setForm((p) => ({ ...p, [k]: e.target.value }))

  return (
    <div className="surface p-6 space-y-5">
      <h2 className="font-semibold text-white">New Claim</h2>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Candidate ID (UUID)"><input className={inputCls} value={form.candidate_id} onChange={set('candidate_id')} /></Field>
        <Field label="Type">
          <select className={selectCls} value={form.type} onChange={set('type')}>
            <option value="strength">Strength</option>
            <option value="weakness">Weakness</option>
            <option value="controversy">Controversy</option>
          </select>
        </Field>
        <Field label="Category">
          <select className={selectCls} value={form.category} onChange={set('category')}>
            {['economy','governance','corruption','education','security','infrastructure','foreign-policy','health','democracy','social'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Credibility (1–10)"><input className={inputCls} type="number" min="1" max="10" value={form.credibility_score} onChange={set('credibility_score')} /></Field>
        <Field label="Weight (1–5)"><input className={inputCls} type="number" min="1" max="5" value={form.weight} onChange={set('weight')} /></Field>
      </div>
      <Field label="Title"><input className={inputCls} value={form.title} onChange={set('title')} /></Field>
      <Field label="Description"><textarea className={inputCls} rows={4} value={form.description} onChange={set('description')} /></Field>
      <button onClick={() => onSubmit({ ...form, credibility_score: Number(form.credibility_score), weight: Number(form.weight) })} className="btn-primary flex items-center gap-2">
        <Plus size={14} /> Save Claim
      </button>
    </div>
  )
}

function LinkForm({ onSubmit }: { onSubmit: (d: object) => void }) {
  const [form, setForm] = useState({ claim_id: '', title: '', url: '' })
  const set = (k: string) => (e: any) => setForm((p) => ({ ...p, [k]: e.target.value }))

  return (
    <div className="surface p-6 space-y-5">
      <h2 className="font-semibold text-white">New Proof Link</h2>
      <Field label="Claim ID (UUID)"><input className={inputCls} value={form.claim_id} onChange={set('claim_id')} /></Field>
      <Field label="Link Title"><input className={inputCls} value={form.title} onChange={set('title')} placeholder="Reuters Fact Check" /></Field>
      <Field label="URL"><input className={inputCls} value={form.url} onChange={set('url')} placeholder="https://reuters.com/..." /></Field>
      <button onClick={() => onSubmit(form)} className="btn-primary flex items-center gap-2">
        <Plus size={14} /> Save Proof Link
      </button>
    </div>
  )
}
