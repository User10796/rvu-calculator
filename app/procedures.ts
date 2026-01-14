export interface Procedure {
  code: string
  name: string
  rvu: number
  bilateral?: boolean // if true, shows unilateral/bilateral options
  bilateralMultiplier?: number // multiplier for bilateral (default 2, some are 1.5)
}

export interface ProcedureCategory {
  name: string
  procedures: Procedure[]
}

export const procedureCategories: ProcedureCategory[] = [
  {
    name: 'SCS/IPG',
    procedures: [
      { code: '63650', name: 'Insertion or replacement of IPG', rvu: 7.15, bilateral: false },
      { code: '63685', name: 'SCS Interrogation', rvu: 5.19, bilateral: false },
      { code: '95972', name: 'SCS Programming', rvu: 0.80, bilateral: false },
    ],
  },
  {
    name: 'Radiofrequency Ablation',
    procedures: [
      { code: '64633', name: 'Cervical/Thoracic RFA 1st Joint', rvu: 3.84, bilateral: true, bilateralMultiplier: 1.5 },
      { code: '64634', name: 'C/T RFA Additional Joint', rvu: 1.32, bilateral: true },
      { code: '64635', name: 'Lumbar RFA 1st Joint', rvu: 3.78, bilateral: true, bilateralMultiplier: 1.5 },
      { code: '64636', name: 'Lumbar RFA Additional Joint', rvu: 1.16, bilateral: true },
      { code: '64625', name: 'SLB RFA', rvu: 3.39, bilateral: true },
      { code: '64624', name: 'Genicular RFA', rvu: 2.50, bilateral: true },
    ],
  },
  {
    name: 'Medial Branch Blocks',
    procedures: [
      { code: '64490', name: 'C/T MBB 1st Level', rvu: 1.82, bilateral: true, bilateralMultiplier: 1.5 },
      { code: '64491', name: 'C/T MBB 2nd Level', rvu: 1.16, bilateral: true },
      { code: '64492', name: 'C/T MBB 3rd+ Level', rvu: 1.16, bilateral: true },
      { code: '64493', name: 'L/S MBB 1st Level', rvu: 1.52, bilateral: true, bilateralMultiplier: 1.5 },
      { code: '64494', name: 'L/S MBB 2nd Level', rvu: 1.00, bilateral: true },
      { code: '64495', name: 'L/S MBB 3rd+ Level', rvu: 1.00, bilateral: true },
      { code: '64451', name: 'SLBB', rvu: 1.52, bilateral: true },
      { code: '64454', name: 'Genicular Nerve Block', rvu: 1.52, bilateral: true },
    ],
  },
  {
    name: 'Epidural Injections',
    procedures: [
      { code: '64479', name: 'C/T TFESI 1st Level', rvu: 2.29, bilateral: true },
      { code: '64480', name: 'C/T TFESI Additional Level', rvu: 1.20, bilateral: true },
      { code: '62325', name: 'C/T ILESI', rvu: 2.20, bilateral: false },
      { code: '64483', name: 'L/S TFESI 1st Level', rvu: 1.90, bilateral: true },
      { code: '64484', name: 'L/S TFESI Additional Level', rvu: 1.00, bilateral: true },
      { code: '62323', name: 'L/S ILESI', rvu: 1.80, bilateral: false },
      { code: '62273', name: 'Epidural Blood Patch', rvu: 2.15, bilateral: false },
    ],
  },
  {
    name: 'Sympathetic Blocks/Neurolysis',
    procedures: [
      { code: '64680', name: 'Celiac Plexus Neurolysis', rvu: 2.67, bilateral: false },
      { code: '64517', name: 'Superior Hypogastric Block', rvu: 2.20, bilateral: false },
      { code: '64530', name: 'Celiac Plexus Block', rvu: 1.58, bilateral: false },
      { code: '64520', name: 'Lumbar Sympathetic Block', rvu: 1.35, bilateral: false },
      { code: '64510', name: 'Stellate Ganglion Block', rvu: 1.22, bilateral: false },
    ],
  },
  {
    name: 'Joint Injections',
    procedures: [
      { code: '27096', name: 'SIJ Injection', rvu: 1.48, bilateral: true, bilateralMultiplier: 1.5 },
      { code: '20611', name: 'Large Joint/Bursa WITH u/s', rvu: 1.10, bilateral: false },
      { code: '20610', name: 'Large Joint/Bursa WITHOUT u/s', rvu: 0.79, bilateral: false },
      { code: '20606', name: 'Intermediate Joint WITH u/s', rvu: 0.89, bilateral: false },
      { code: '20604', name: 'Small Joint WITH u/s', rvu: 1.00, bilateral: false },
      { code: '20550', name: 'Tendon Origin/Insertion', rvu: 0.67, bilateral: false },
      { code: '20526', name: 'Carpal Tunnel Injection', rvu: 0.75, bilateral: false },
    ],
  },
  {
    name: 'Peripheral Nerve Blocks',
    procedures: [
      { code: '64615', name: 'Botox - Migraine', rvu: 1.85, bilateral: false },
      { code: '64616', name: 'Botox - Neck', rvu: 1.53, bilateral: false },
      { code: '64461', name: 'Paravertebral Block 1st Level', rvu: 1.75, bilateral: false },
      { code: '64462', name: 'Paravertebral Block 2nd+ Level', rvu: 1.10, bilateral: false },
      { code: '64450+64447', name: 'II/IH Block w/ u/s', rvu: 1.85, bilateral: true },
      { code: '64420', name: 'ICNB 1st Level', rvu: 1.08, bilateral: false },
      { code: '64421', name: 'ICNB 2nd+ Level', rvu: 0.55, bilateral: false },
      { code: '64418', name: 'Suprascapular Nerve Block', rvu: 1.10, bilateral: true },
      { code: '64450', name: 'Peripheral Nerve Block', rvu: 0.75, bilateral: false },
      { code: '64405', name: 'Greater Occipital Nerve Block', rvu: 0.94, bilateral: true },
      { code: '64505', name: 'SPG Block', rvu: 0.75, bilateral: false },
    ],
  },
  {
    name: 'Trigger Point Injections',
    procedures: [
      { code: '20552', name: 'TPIs, 1-2 muscles', rvu: 0.66, bilateral: false },
      { code: '20553', name: 'TPIs, 3+ muscles', rvu: 0.75, bilateral: false },
    ],
  },
  {
    name: 'Guidance',
    procedures: [
      { code: '76942', name: 'Ultrasound Guidance', rvu: 0.67, bilateral: false },
      { code: '76000', name: 'Fluoroscopy Guidance', rvu: 0.30, bilateral: false },
    ],
  },
  {
    name: 'Sedation',
    procedures: [
      { code: '99152', name: 'Moderate Sedation', rvu: 0.25, bilateral: false },
    ],
  },
  {
    name: 'E&M',
    procedures: [
      { code: '99203', name: 'New Patient Level 3', rvu: 1.60, bilateral: false },
      { code: '99204', name: 'New Patient Level 4', rvu: 2.60, bilateral: false },
      { code: '99205', name: 'New Patient Level 5', rvu: 3.50, bilateral: false },
      { code: '99213', name: 'Established Patient Level 3', rvu: 1.30, bilateral: false },
      { code: '99214', name: 'Established Patient Level 4', rvu: 1.92, bilateral: false },
      { code: '99215', name: 'Established Patient Level 5', rvu: 2.80, bilateral: false },
    ],
  },
]
