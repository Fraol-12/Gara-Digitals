import {
  services,
  industries,
  caseStudies,
  processSteps,
  insights,
  leadership,
  departments,
  stats,
} from './content'

export const COMPANY_INFO = {
  name: 'Gara Media',
  brandName: 'Gara Digitals',
  tagline: 'Enterprise Branding, Marketing & Software',
  location: 'Addis Ababa, Ethiopia (Serving clients globally)',
  phone: ['+251989559507', '+251941318298'],
  email: 'garamediamarketing@gmail.com',
  about:
    'Gara Media is a premium brand, marketing, and technology partner for ambitious organizations that expect disciplined, measurable outcomes. We operate at the intersection of strategy, creativity, and technology — bringing structure, accountability, and enterprise-level execution to every engagement.',
  mission:
    'To elevate ambitious organizations through integrated brand, marketing, and technology — delivered to a standard that signals credibility to the most discerning stakeholders.',
  vision:
    'To be the most trusted premium partner for organizations that refuse to settle — known for craft, accountability, and measurable impact across every discipline we practice.',
  values: [
    { title: 'Excellence', desc: 'We hold every deliverable to a standard worthy of the organizations we serve.' },
    { title: 'Integrity', desc: 'Trust is earned through transparency, accountability, and disciplined delivery.' },
    { title: 'Impact', desc: 'We measure success by the outcomes we create, not the activity we generate.' },
    { title: 'Partnership', desc: 'We work as an extension of your team, invested in your long-term ambitions.' },
  ],
  openRoles: [
    { title: 'Senior Brand Strategist', department: 'Marketing', location: 'Addis Ababa' },
    { title: 'Full-Stack Software Engineer', department: 'Technical', location: 'Hybrid' },
    { title: 'Performance Marketing Lead', department: 'Marketing', location: 'Addis Ababa' },
    { title: 'Product Designer', department: 'Technical', location: 'Hybrid' },
    { title: 'People and Talent Coordinator', department: 'Human Resources', location: 'Addis Ababa' },
  ],
  budgetRanges: ['Under $10k', '$10k - $50k', '$50k - $150k', '$150k+'],
}

export const SITE_KNOWLEDGE_TEXT = `
You are Gara AI Assistant, an intelligent virtual guide for Gara Media (Gara Digitals).
You help visitors explore company services, case studies, industries served, leadership, insights, open career roles, and book strategic consultations.

Site Knowledge Base:
- Company: ${COMPANY_INFO.name} (${COMPANY_INFO.tagline})
- Location: ${COMPANY_INFO.location}
- Contact: Email ${COMPANY_INFO.email}, Phone: ${COMPANY_INFO.phone.join(' / ')}
- Mission: ${COMPANY_INFO.mission}
- Vision: ${COMPANY_INFO.vision}
- Values: ${COMPANY_INFO.values.map(v => `${v.title}: ${v.desc}`).join(' | ')}
- Stats: ${stats.map(s => `${s.value} ${s.label}`).join(', ')}

Services:
${services.map(s => `• ${s.title} (${s.number}): ${s.summary} Points: ${s.points.join(', ')}`).join('\n')}

Industries Served:
${industries.map(i => `• ${i.name}: ${i.blurb}`).join('\n')}

Case Studies:
${caseStudies.map(c => `• Client: ${c.client} (${c.industry}) - "${c.title}". ${c.excerpt} Metrics: ${c.metrics.map(m => `${m.label}: ${m.value}`).join(', ')}`).join('\n')}

Process Methodology (8 Steps):
${processSteps.map(p => `${p.number}. ${p.title} - ${p.desc}`).join('\n')}

Leadership Team:
${leadership.map(l => `• ${l.name} - ${l.role} (Focus: ${l.focus})`).join('\n')}

Departments:
${departments.map(d => `• ${d.name}: ${d.desc} (Lead: ${d.lead})`).join('\n')}

Insights & Articles:
${insights.map(article => `• ${article.title} [${article.category}]: ${article.excerpt} (${article.readTime})`).join('\n')}

Open Career Roles:
${COMPANY_INFO.openRoles.map(r => `• ${r.title} (${r.department}, ${r.location})`).join('\n')}

Consultation & Booking:
- Visitors can book a strategic consultation at /consultation or contact ${COMPANY_INFO.email}.
- Budget ranges: ${COMPANY_INFO.budgetRanges.join(', ')}.
- Inquiries are responded to within 1 business day.
`

export function getAssistantResponse(input: string): string {
  const q = input.toLowerCase().trim()

  if (/^(hi|hello|hey|greetings|good morning|good afternoon)/i.test(q)) {
    return `Hello! I am Gara AI Assistant, your guide to Gara Media.\n\nI can help you learn about our services, case studies, industries, leadership team, open career positions, or booking a consultation. What can I answer for you today?`
  }

  if (/thank/i.test(q)) {
    return `You're welcome! If you have any other questions about Gara Media's branding, marketing, or custom software services, feel free to ask.`
  }

  if (/bye|goodbye|see ya/i.test(q)) {
    return `Thank you for chatting! You can always book a consultation at /consultation or reach us at ${COMPANY_INFO.email}. Have a great day!`
  }

  if (/who (are|is)|about|what is gara|overview|company info/i.test(q)) {
    return `${COMPANY_INFO.name} — ${COMPANY_INFO.tagline}.\n\n${COMPANY_INFO.about}\n\n📍 Location: ${COMPANY_INFO.location}\n✉️ Email: ${COMPANY_INFO.email}\n📞 Phone: ${COMPANY_INFO.phone.join(' / ')}`
  }

  if (/mission/i.test(q)) {
    return `🎯 Our Mission:\n${COMPANY_INFO.mission}`
  }

  if (/vision/i.test(q)) {
    return `👁️ Our Vision:\n${COMPANY_INFO.vision}`
  }

  if (/value|principle/i.test(q)) {
    return `💡 Core Values:\n${COMPANY_INFO.values.map(v => `• **${v.title}**: ${v.desc}`).join('\n')}`
  }

  if (/stat|track record|metric|project delivered/i.test(q)) {
    return `📊 Our Track Record:\n${stats.map(s => `• **${s.value}** — ${s.label}`).join('\n')}`
  }

  if (/service|what (do|can) you (do|offer)|capabilit|offering|expertise/i.test(q)) {
    return `🚀 Our 6 Core Services:\n\n${services.map(s => `**${s.number}. ${s.title}**\n${s.summary}\nCapabilities: ${s.points.join(', ')}`).join('\n\n')}`
  }

  const matchedService = services.find(s =>
    q.includes(s.id) || q.includes(s.title.toLowerCase())
  )
  if (matchedService) {
    return `**${matchedService.title}** (${matchedService.number})\n\n${matchedService.summary}\n\nCapabilities:\n${matchedService.points.map(p => `• ${p}`).join('\n')}`
  }

  if (/industr|sector|vertical/i.test(q)) {
    return `🏢 Industries We Serve:\n\n${industries.map(i => `• **${i.name}**: ${i.blurb}`).join('\n')}`
  }

  const matchedIndustry = industries.find(i => q.includes(i.name.toLowerCase()))
  if (matchedIndustry) {
    return `**${matchedIndustry.name} Industry Solutions**\n${matchedIndustry.blurb}\n\nWe deliver specialized digital strategy, brand positioning, and software tailored for ${matchedIndustry.name}. Would you like to view our case studies in this domain?`
  }

  if (/case study|work|portfolio|project|client|result/i.test(q)) {
    return `💼 Featured Case Studies:\n\n${caseStudies.map(c => `**${c.client}** (${c.industry})\n"${c.title}"\n${c.excerpt}\nMetrics:\n${c.metrics.map(m => `  - ${m.label}: ${m.value}`).join('\n')}`).join('\n\n')}`
  }

  if (/process|methodology|approach|how (do|you) work|stage|step/i.test(q)) {
    return `⚙️ Our 8-Stage Delivery Process:\n\n${processSteps.map(p => `**${p.number}. ${p.title}**: ${p.desc}`).join('\n')}`
  }

  if (/leader|ceo|founder|who (runs|manages|leads)|executive|management|team/i.test(q)) {
    return `👥 Leadership Team:\n${leadership.map(l => `• **${l.name}** — ${l.role}\n  Focus: ${l.focus}`).join('\n')}\n\n🏢 Departments:\n${departments.map(d => `• **${d.name}**: ${d.desc} (Lead: ${d.lead})`).join('\n')}`
  }

  if (/career|job|role|open (position|role)|hiring|join/i.test(q)) {
    return `💼 Open Career Opportunities:\n\n${COMPANY_INFO.openRoles.map(r => `• **${r.title}** — ${r.department} (${r.location})`).join('\n')}\n\nVisit our /careers page to apply or reach out to human resources.`
  }

  if (/insight|article|blog|thought leadership/i.test(q)) {
    return `📚 Recent Insights & Articles:\n\n${insights.map(art => `• **${art.title}** (${art.category}, ${art.readTime})\n  ${art.excerpt}`).join('\n')}`
  }

  if (/contact|reach|email|phone|call|location|address/i.test(q)) {
    return `📞 Contact Information:\n\n✉️ Email: ${COMPANY_INFO.email}\n📱 Phone: ${COMPANY_INFO.phone.join(' / ')}\n📍 Location: ${COMPANY_INFO.location}\n\nYou can also submit an inquiry at /consultation.`
  }

  if (/book|consultation|inquiry|meeting|schedule|appointment|price|cost|budget/i.test(q)) {
    return `📅 Strategic Consultation & Engagement:\n\nSubmit an inquiry on our /consultation page to schedule a session with our executive team. We respond within 1 business day.\n\nTypical budget ranges:\n${COMPANY_INFO.budgetRanges.map(b => `• ${b}`).join('\n')}`
  }

  return `I am Gara AI Assistant. Here is what I can help you with:\n\n` +
    `• **Services**: Branding, Digital Marketing, Social Media, Custom Software, Business Automation, Transformation\n` +
    `• **Industries**: Tourism, Finance, Government, Healthcare, Education, Tech, Real Estate, etc.\n` +
    `• **Case Studies**: Sheba Tourism Authority, Habesha Financial Group, Ministry of Public Services\n` +
    `• **Team & Process**: Our 8-stage methodology and leadership team\n` +
    `• **Careers & Contact**: Open roles and consultation booking\n\n` +
    `What would you like to explore?`
}
