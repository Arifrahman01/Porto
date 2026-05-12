const PORTFOLIO_DATA = {
  personal: {
    name: "Arif Rahman",
    title: "Full-stack Developer · SAP ABAPER · SAP Fiori · SAP Analytic Cloud",
    shortTitle: "Full-stack Dev · SAP ABAPER",
    location: "Banjarmasin, Kalimantan Selatan, Indonesia",
    shortLocation: "Banjarmasin, Kalimantan Selatan",
    summary: "Bekerja dibidang programming sejak <strong>2014</strong> hingga sekarang. Saat ini fokus dalam pengembangan dan perbaikan <strong>sistem manajemen dealer berbasis WEB</strong> yang berfokus pada kecepatan akses dan efisiensi.",
    email: "arfrahmann@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/arif-rahman-0b7892209",
    linkedinLabel: "arif-rahman-0b7892209",
    cvUrl: "Profile.pdf",
    experienceYears: "10+ tahun (sejak 2014)",
    avatarInitials: "AR"
  },
  skills: [
    { name: "SAP ABAP", icon: "🔷", level: 90, top: true },
    { name: "SAP Analytics Cloud", icon: "📊", level: 85, top: true },
    { name: "Data Analysis", icon: "📈", level: 82, top: true },
    { name: "Full-stack Web Dev", icon: "🌐", level: 88, top: false },
    { name: "SAP Fiori", icon: "🎨", level: 80, top: false },
    { name: "SQL / Database", icon: "🗄️", level: 85, top: false },
    { name: "Machine Learning (R)", icon: "🤖", level: 70, top: false },
    { name: "IT Support & Networking", icon: "🔧", level: 75, top: false }
  ],
  education: {
    university: "Universitas Islam Kalimantan Muhammad Arsyad Al Banjari",
    degree: "Gelar Sarjana, Informatika",
    year: "2014 – 2018",
    location: "Banjarmasin, Kalimantan Selatan"
  },
  certifications: [
    { name: "Data Visualization in Data Science using R", issuer: "DQLab", icon: "📊" },
    { name: "Guide to Learn SQL with AI at DQLab", issuer: "DQLab", icon: "🤖" },
    { name: "Project Machine Learning for Retail with R: Product Packaging", issuer: "DQLab", icon: "🛒" },
    { name: "SAP Training Course, SAP ABAP and FIORI", issuer: "SAP", icon: "🔷" }
  ],
  experiences: [
    {
      company: "PT. Jhonlin Group",
      role: "Staff Web Developer",
      period: "Mei 2022 – Sekarang · 4+ tahun",
      location: "Batulicin, Kalimantan Selatan",
      description: "Pengembangan dan pemeliharaan sistem manajemen dealer berbasis web.",
      current: true
    },
    {
      company: "PT Acarya Data Esa",
      role: "Web Programmer",
      period: "Februari 2023 – Juli 2023 · 6 bulan",
      location: "Jakarta Raya, Indonesia",
      description: "",
      current: false
    },
    {
      company: "Trio Motor",
      role: "Software Programmer / Web Programmer",
      period: "April 2019 – Mei 2022 · 3 tahun 2 bulan",
      location: "Banjarmasin, Kalimantan Selatan",
      description: "",
      current: false
    },
    {
      company: "PT. Syifa Medika Persada",
      role: "Information Technology Staff",
      period: "Februari 2018 – Desember 2018 · 11 bulan",
      location: "Banjarbaru, Kalimantan Selatan",
      description: "Pengembangan Sistem, Perbaikan Perangkat Periferal, Pengelolaan Jaringan.",
      current: false
    }
  ],
  projects: [
    {
      name: "Dealer Management System",
      description: "Sistem manajemen dealer berbasis WEB dengan fokus performa dan kecepatan akses untuk PT. Jhonlin Group.",
      icon: "🚗",
      bgGradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      tags: ["Web", "PHP", "MySQL"]
    },
    {
      name: "SAP ABAP Custom Programs",
      description: "Pengembangan program SAP ABAP kustom dan laporan bisnis menggunakan SAP Fiori untuk enterprise client.",
      icon: "🔷",
      bgGradient: "linear-gradient(135deg, #1a0533, #3d0b6e, #7b2fff)",
      tags: ["SAP ABAP", "SAP Fiori", "SAPUI5"]
    },
    {
      name: "SAP Analytics Cloud Dashboard",
      description: "Dashboard analitik bisnis real-time menggunakan SAP Analytics Cloud untuk visualisasi data perusahaan.",
      icon: "📊",
      bgGradient: "linear-gradient(135deg, #0d2b1d, #1a5c3a, #00c853)",
      tags: ["SAP AC", "Data Analysis", "BI"]
    },
    {
      name: "ML Retail - Product Packaging",
      description: "Proyek Machine Learning untuk retail menggunakan R, analisis data penjualan dan optimasi pengemasan produk.",
      icon: "🤖",
      bgGradient: "linear-gradient(135deg, #1a1200, #4a3500, #f5a623)",
      tags: ["R", "Machine Learning", "DQLab"]
    }
  ]
};
