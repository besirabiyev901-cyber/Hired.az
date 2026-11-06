/**
 * Hired.az — B2B HR Süni İntellekt Ekranlaşdırma Platforması
 * İdarəetmə, Naviqasiya Drawer, Gemini AI və Real CV Parsinqi (script.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. ZƏNGİN SEED BAZASI (AZƏRBAYCAN B2B ŞİRKƏTLƏRİ ÜÇÜN CV BAZASI)
  // -------------------------------------------------------------
  const initialCandidates = [
    // AKTİV TƏSDİQLƏNMİŞ NAMİZƏDLƏR
    {
      id: 'AZ-101',
      name: 'Əli Məmmədov',
      email: 'ali.mammadov@gmail.com',
      phone: '+994 50 234 56 78',
      role: 'Senior Frontend Mühəndis',
      branch: 'Nərimanov Filialı',
      distance: '1.2 km',
      workMode: 'Tam ştat',
      education: 'Magistr (BDU Kompüter Elmləri)',
      experience: '5+ il',
      expYears: 6,
      aiScore: 96,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'active',
      date: '2026-11-05 14:20',
      avatar: 'ƏM',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux'],
      aiAnalysis: {
        tempMail: 'Təmiz (Gmail rəsmi domen)',
        antiBot: 'İnsan davranışı təsdiqləndi (142ms gecikmə)',
        geoMatch: 'Yüksək (1.2 km N.Nərimanov m/s)',
        expCoherence: '100% şirkət qeydləri uyğundur'
      }
    },
    {
      id: 'AZ-102',
      name: 'Leyla Qasımova',
      email: 'leyla.q@code.az',
      phone: '+994 55 890 12 34',
      role: 'Data Analyst / BI Mütəxəssis',
      branch: 'Nizami Filialı',
      distance: '2.8 km',
      workMode: 'Yarımştat',
      education: 'Ali (ADA Universiteti IT)',
      experience: '3-5 il',
      expYears: 4,
      aiScore: 94,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'active',
      date: '2026-11-05 11:15',
      avatar: 'LQ',
      skills: ['SQL', 'Power BI', 'Python', 'Pandas', 'Tableau'],
      aiAnalysis: {
        tempMail: 'Təmiz (Korporativ domen code.az)',
        antiBot: 'İnsan doldurması',
        geoMatch: '2.8 km məsafə',
        expCoherence: 'Portfel və layihələr təsdiqlənib'
      }
    },
    {
      id: 'AZ-103',
      name: 'Rəşad Əliyev',
      email: 'reshad.eliyev@mail.ru',
      phone: '+994 70 345 67 89',
      role: 'Müştəri Xidmətləri & Kassa',
      branch: 'Gənclik Filialı',
      distance: '0.8 km',
      workMode: 'Tam ştat',
      education: 'Ali (UNEC İqtisadiyyat)',
      experience: '1-3 il',
      expYears: 2,
      aiScore: 78,
      aiStatus: 'Yoxlanılır',
      aiVerdict: 'Gözləmədə',
      tabCategory: 'active',
      date: '2026-11-04 16:45',
      avatar: 'RƏ',
      skills: ['1C Mühasibat', 'Müştəri yönümlülük', 'Kassa əməliyyatları'],
      aiAnalysis: {
        tempMail: 'Şəxsi Mail.ru ünvanı',
        antiBot: 'Normal form doldurma',
        geoMatch: '0.8 km (Piyada 10 dəq)',
        expCoherence: 'HR komissiya zəngi tələb olunur'
      }
    },
    {
      id: 'AZ-104',
      name: 'Nərgiz Babayeva',
      email: 'nargiz.b@finans.az',
      phone: '+994 51 445 22 11',
      role: 'Aparıcı Mühasib (ACCA)',
      branch: '28 May Filialı',
      distance: '1.5 km',
      workMode: 'Tam ştat',
      education: 'Magistr (Dövlət İqtisad Universiteti)',
      experience: '5+ il',
      expYears: 7,
      aiScore: 98,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'active',
      date: '2026-11-04 10:30',
      avatar: 'NB',
      skills: ['Milli Mühasibat Standartları', '1C: Müəssisə 8.3', 'Vergi Məcəlləsi'],
      aiAnalysis: {
        tempMail: 'Təsdiqlənmiş VÖEN korporativ email',
        antiBot: 'İnsan davranışı',
        geoMatch: '1.5 km (28 May m/s)',
        expCoherence: 'ACCA sertifikatı etibarlıdır'
      }
    },
    {
      id: 'AZ-105',
      name: 'Elvin Quliyev',
      email: 'elvin.quliyev@devops.az',
      phone: '+994 50 671 99 00',
      role: 'DevOps / Cloud Arxitektor',
      branch: 'Nərimanov Filialı',
      distance: '1.9 km',
      workMode: 'Uzaqdan',
      education: 'Ali (BANM Qafqaz/Neft-Qaz)',
      experience: '5+ il',
      expYears: 6,
      aiScore: 95,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'active',
      date: '2026-11-03 18:20',
      avatar: 'EQ',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD Pipelines'],
      aiAnalysis: {
        tempMail: 'Təmiz',
        antiBot: 'Təsdiq edildi',
        geoMatch: 'Uzaqdan (Nərimanov qovşağı)',
        expCoherence: 'Əvvəlki iş yerindən tövsiyə məktubu mövcuddur'
      }
    },
    {
      id: 'AZ-106',
      name: 'Aytən Məcidova',
      email: 'ayten.mecid@gmail.com',
      phone: '+994 77 312 88 44',
      role: 'HR Koordinator & Rəqəmsal İşə Qəbul',
      branch: 'Yasamal Filialı',
      distance: '2.1 km',
      workMode: 'Hibrid',
      education: 'Ali (BDU Beynəlxalq Münasibətlər)',
      experience: '3-5 il',
      expYears: 3.5,
      aiScore: 91,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'active',
      date: '2026-11-03 14:10',
      avatar: 'AM',
      skills: ['İşə qəbul', 'Əmək Məcəlləsi', '1C ZUP', 'Linkedin Recruiter'],
      aiAnalysis: {
        tempMail: 'Təmiz',
        antiBot: 'Təsdiqlənib',
        geoMatch: 'Yasamal parkı ərazisi',
        expCoherence: 'B2B şirkətlərdə təcrübəsi var'
      }
    },
    {
      id: 'AZ-107',
      name: 'Kamran Vəliyev',
      email: 'kamran.veliyev@outlook.com',
      phone: '+994 55 401 23 88',
      role: 'B2B Korporativ Satış Meneceri',
      branch: 'Sahil Filialı',
      distance: '1.1 km',
      workMode: 'Tam ştat',
      education: 'Ali (Azərbaycan Dillər Universiteti)',
      experience: '3-5 il',
      expYears: 4,
      aiScore: 89,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'active',
      date: '2026-11-02 09:40',
      avatar: 'KV',
      skills: ['B2B Sales', 'Soyuq zənglər', 'Təqdimat bacarığı', 'CRM Bitrix24'],
      aiAnalysis: {
        tempMail: 'Outlook rəsmi',
        antiBot: 'Təbii davranış',
        geoMatch: '1.1 km Sahil metrosu',
        expCoherence: 'Satış planları göstəriciləri əlavə olunub'
      }
    },
    {
      id: 'AZ-108',
      name: 'Günel İbrahimova',
      email: 'gunel.ibr@it-academy.az',
      phone: '+994 50 822 19 03',
      role: 'QA Avtomatlaşdırma Mühəndisi',
      branch: 'Nərimanov Filialı',
      distance: '1.6 km',
      workMode: 'Hibrid',
      education: 'Ali (AzTU Kompüter Mühəndisliyi)',
      experience: '1-3 il',
      expYears: 2.5,
      aiScore: 92,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'active',
      date: '2026-11-01 15:30',
      avatar: 'Gİ',
      skills: ['Selenium', 'Cypress', 'JavaScript', 'Postman API Test'],
      aiAnalysis: {
        tempMail: 'Rəsmi tədris mərkəzi emaili',
        antiBot: 'Normal',
        geoMatch: '1.6 km',
        expCoherence: 'Test ssenariləri GitHub keçidi yoxlanıldı'
      }
    },

    // ELİMİNƏ OLUNANLAR VƏ BLOKLANMIŞ BOTLAR
    {
      id: 'BOT-8491',
      name: 'Alex Miller (Bot Avtomat)',
      email: 'temp_user_992@guerrillamail.com',
      phone: '+1 800 234 9182',
      role: 'Senior Lead Full-stack Everything',
      branch: 'Nərimanov Filialı',
      distance: '9,400 km (ABŞ)',
      workMode: 'Tam ştat',
      education: 'Orta-ixtisas (Qeyri-müəyyən)',
      experience: '5+ il',
      expYears: 10,
      aiScore: 12,
      aiStatus: 'Bot / Saxta',
      aiVerdict: 'Eliminə olundu',
      tabCategory: 'eliminated',
      date: '2026-11-05 16:59',
      avatar: 'AM',
      skills: ['ChatGPT copy-paste', 'Fake LinkedIn', 'Keyword Stuffing'],
      aiAnalysis: {
        tempMail: '🔴 Birdəfəlik temp-mail domeni (guerrillamail)',
        antiBot: '🔴 1 saniyədə 12 təkrar müraciət aşkarlandı',
        geoMatch: '🔴 Bakı hüdudlarından kənar (ABŞ proksi)',
        expCoherence: '🔴 ChatGPT tərəfindən uydurulmuş CV mətni'
      }
    },
    {
      id: 'BOT-8492',
      name: 'Bot_Crawler_v4 (Spam Script)',
      email: 'auto_script@trashmail.org',
      phone: 'Tel: Qeyd edilməyib',
      role: 'DevOps / Kubernetes Operator',
      branch: 'Nizami Filialı',
      distance: 'Məlum deyil',
      workMode: 'Uzaqdan',
      education: 'Ali (Saxta Universitet)',
      experience: '5+ il',
      expYears: 8,
      aiScore: 4,
      aiStatus: 'Bot / Saxta',
      aiVerdict: 'Eliminə olundu',
      tabCategory: 'eliminated',
      date: '2026-11-05 16:58',
      avatar: 'BC',
      skills: ['Headless Chrome', 'Web Scraping', 'Form Injection'],
      aiAnalysis: {
        tempMail: '🔴 Qara siyahıdaki trashmail domeni',
        antiBot: '🔴 Headless Chrome istifadəçi agenti',
        geoMatch: '🔴 IP: 185.220.101.5 (Tor çıxış qovşağı)',
        expCoherence: '🔴 Avtomatlaşdırılmış bot hücumu'
      }
    },
    {
      id: 'BOT-8493',
      name: 'Tural Səfərov (Tarix Şübhəsi)',
      email: 'tural_saf_fake@yahoo.com',
      phone: '+994 50 771 22 33',
      role: 'Baş Mühasib',
      branch: 'Gənclik Filialı',
      distance: '3.4 km',
      workMode: 'Tam ştat',
      education: 'Ali (İqtisad Universiteti)',
      experience: '0-1 il',
      expYears: 1,
      aiScore: 28,
      aiStatus: 'Şübhəli',
      aiVerdict: 'Eliminə olundu',
      tabCategory: 'eliminated',
      date: '2026-11-04 12:10',
      avatar: 'TS',
      skills: ['Mühasibat', 'Vergi bəyannaməsi'],
      aiAnalysis: {
        tempMail: 'Yahoo poçt ünvanı',
        antiBot: 'İnsan doldurub',
        geoMatch: '3.4 km',
        expCoherence: '🔴 Vakansiya tələbi min. 3 ildir, tarixlər üst-üstə düşmür'
      }
    },
    {
      id: 'BOT-8494',
      name: 'Crypto_Job_Spammer_AZ',
      email: 'bonus_job@10minutemail.net',
      phone: '+7 900 111 22 33',
      role: 'Kripto Əməliyyatçı / Menecer',
      branch: '28 May Filialı',
      distance: 'Qeyd edilməyib',
      workMode: 'Uzaqdan',
      education: 'Orta-ixtisas',
      experience: '0-1 il',
      expYears: 0.5,
      aiScore: 8,
      aiStatus: 'Bot / Saxta',
      aiVerdict: 'Eliminə olundu',
      tabCategory: 'eliminated',
      date: '2026-11-03 23:45',
      avatar: 'CJ',
      skills: ['Telegram bot linki', 'Phishing URL', 'Spam axını'],
      aiAnalysis: {
        tempMail: '🔴 10minutemail domeni',
        antiBot: '🔴 Şübhəli kənar fişinq linkləri',
        geoMatch: '🔴 Naməlum IP',
        expCoherence: '🔴 Spam müraciət'
      }
    },

    // ÜMUMİ ARXİV QEYDLƏRİ
    {
      id: 'ARX-201',
      name: 'Tural Əliyev',
      email: 'tural.aliyev@devs.az',
      phone: '+994 50 211 44 88',
      role: 'Senior DevOps Engineer',
      branch: 'Nərimanov Filialı',
      distance: '1.4 km',
      workMode: 'Tam ştat',
      education: 'Magistr (AzTU)',
      experience: '5+ il',
      expYears: 7,
      aiScore: 96,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'archive',
      date: '2026-10-14 16:42',
      avatar: 'TƏ',
      skills: ['Kubernetes', 'CI/CD', 'Docker', 'Linux Core'],
      aiAnalysis: {
        tempMail: 'Təsdiqlənib',
        antiBot: 'Təmiz',
        geoMatch: '1.4 km Nərimanov',
        expCoherence: 'Arxivləşdirilib (Müsahibə tamamlanıb)'
      }
    },
    {
      id: 'ARX-202',
      name: 'Leyla Məmmədova',
      email: 'leyla.m@analytics.az',
      phone: '+994 77 409 12 33',
      role: 'Neft-Qaz Əməliyyatları Data Analitiki',
      branch: 'Sahil Filialı',
      distance: '0.9 km',
      workMode: 'Tam ştat',
      education: 'Ali (BANM)',
      experience: '3-5 il',
      expYears: 3,
      aiScore: 65,
      aiStatus: 'Yoxlanılır',
      aiVerdict: 'Gözləmədə',
      tabCategory: 'archive',
      date: '2026-10-13 11:18',
      avatar: 'LM',
      skills: ['SQL', 'Power BI', 'Excel Advanced'],
      aiAnalysis: {
        tempMail: 'Təmiz',
        antiBot: 'Təmiz',
        geoMatch: '0.9 km',
        expCoherence: 'Komissiyada ikinci tur gözləyir'
      }
    },
    {
      id: 'ARX-203',
      name: 'Rəşad İsmayılov',
      email: 'r.ismayil@protonmail.com',
      phone: '+994 55 901 00 22',
      role: 'Kibertəhlükəsizlik Pentester',
      branch: 'Yasamal Filialı',
      distance: '4.2 km',
      workMode: 'Uzaqdan',
      education: 'Ali (BDU)',
      experience: '0-1 il',
      expYears: 1,
      aiScore: 18,
      aiStatus: 'İmtina',
      aiVerdict: 'Eliminə olundu',
      tabCategory: 'archive',
      date: '2026-10-12 09:05',
      avatar: 'Rİ',
      skills: ['Kali Linux', 'Burp Suite'],
      aiAnalysis: {
        tempMail: 'Şifrələnmiş Protonmail',
        antiBot: 'Təmiz',
        geoMatch: '4.2 km',
        expCoherence: '🔴 Tələb olunan sertifikatlar (OSCP/CEH) yoxdur'
      }
    },
    {
      id: 'ARX-204',
      name: 'Nərgiz Qasımova',
      email: 'nargiz.gasimova@socar.az',
      phone: '+994 50 334 11 90',
      role: 'Layihə Meneceri (PMP)',
      branch: 'Nərimanov Filialı',
      distance: '1.2 km',
      workMode: 'Tam ştat',
      education: 'Magistr (Xəzər Universiteti)',
      experience: '5+ il',
      expYears: 5,
      aiScore: 91,
      aiStatus: 'Etibarlı',
      aiVerdict: 'Təsdiqləndi',
      tabCategory: 'archive',
      date: '2026-10-11 14:20',
      avatar: 'NQ',
      skills: ['Agile', 'Scrum', 'Jira', 'PMP Certification'],
      aiAnalysis: {
        tempMail: 'SOCAR rəsmi',
        antiBot: 'İnsan',
        geoMatch: 'Nərimanov qərargahı',
        expCoherence: 'İşə qəbul təklifi göndərilib'
      }
    }
  ];

  // -------------------------------------------------------------
  // 2. TƏTBİQ VƏZİYYƏTİ (APPLICATION STATE)
  // -------------------------------------------------------------
  let candidates = [...initialCandidates];
  let currentTab = 'active'; // 'active' | 'eliminated' | 'archive'
  let currentView = 'candidates'; // 'candidates' | 'pricing'
  let manualEditMode = false;
  let searchQuery = '';
  let selectedCandidateIds = new Set();
  let activeDetailCandidate = null;

  let filters = {
    workMode: 'all',
    branch: 'all',
    education: 'all',
    experience: 'all'
  };

  // Korporativ Şirkət Profili
  let companyProfile = {
    name: 'SOCAR Enerji QSC',
    voen: '1402948191',
    email: 'hr@socar.az',
    plan: 'Pro Paket',
    branches: 12
  };

  // LocalStorage-dən yüklə
  try {
    const saved = localStorage.getItem('hired_company_profile');
    if (saved) {
      companyProfile = JSON.parse(saved);
    }
  } catch (e) {
    console.warn('LocalStorage oxuma xətası:', e);
  }

  // -------------------------------------------------------------
  // 3. DOM ELEMENTLƏRİ
  // -------------------------------------------------------------
  // Naviqasiya Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navDrawer = document.getElementById('navDrawer');
  const navDrawerOverlay = document.getElementById('navDrawerOverlay');
  const closeNavDrawerBtn = document.getElementById('closeNavDrawerBtn');
  const drawerLinkActive = document.getElementById('drawerLinkActive');
  const drawerLinkEliminated = document.getElementById('drawerLinkEliminated');
  const drawerLinkArchive = document.getElementById('drawerLinkArchive');
  const drawerLinkPricing = document.getElementById('drawerLinkPricing');
  const drawerBadgeActive = document.getElementById('drawerBadgeActive');
  const drawerBadgeEliminated = document.getElementById('drawerBadgeEliminated');
  const drawerBadgeArchive = document.getElementById('drawerBadgeArchive');
  const drawerCompanyName = document.getElementById('drawerCompanyName');
  const drawerCompanyVoen = document.getElementById('drawerCompanyVoen');
  const drawerCompanyPlan = document.getElementById('drawerCompanyPlan');
  const drawerCompanyAvatar = document.getElementById('drawerCompanyAvatar');
  const drawerEditCompanyBtn = document.getElementById('drawerEditCompanyBtn');
  const drawerAuthModalBtn = document.getElementById('drawerAuthModalBtn');
  const drawerGeminiKeyBtn = document.getElementById('drawerGeminiKeyBtn');

  // Əsas Bölmələr
  const candidatesSection = document.getElementById('candidatesSection');
  const pricingSection = document.getElementById('pricingSection');
  const openPricingBtn = document.getElementById('openPricingBtn');
  const backToCandidatesBtn = document.getElementById('backToCandidatesBtn');
  const logoClickHome = document.getElementById('logoClickHome');

  // Topbar elementləri
  const topbarCompanyName = document.getElementById('topbarCompanyName');
  const topbarCompanyVoen = document.getElementById('topbarCompanyVoen');
  const topbarCompanyPlan = document.getElementById('topbarCompanyPlan');
  const topbarCompanyBranches = document.getElementById('topbarCompanyBranches');
  const openAuthModalBtn = document.getElementById('openAuthModalBtn');
  const openGeminiKeyHeaderBtn = document.getElementById('openGeminiKeyHeaderBtn');

  // Bento Metrikləri
  const metricVerified = document.getElementById('metricVerifiedCount');
  const metricBot = document.getElementById('metricBotCount');
  const metricArchive = document.getElementById('metricArchiveCount');
  const bentoCardActive = document.getElementById('bentoCardActive');
  const bentoCardEliminated = document.getElementById('bentoCardEliminated');
  const bentoCardArchive = document.getElementById('bentoCardArchive');

  // Cədvəl və Filtrlər
  const tableBody = document.getElementById('candidatesTableBody');
  const tableTitle = document.getElementById('tableTitle');
  const filteredResultsCount = document.getElementById('filteredResultsCount');
  const emptyState = document.getElementById('tableEmptyState');
  const emptyStateResetBtn = document.getElementById('emptyStateResetBtn');
  const searchInput = document.getElementById('searchInput');
  const filterWorkMode = document.getElementById('filterWorkMode');
  const filterBranch = document.getElementById('filterBranch');
  const filterEducation = document.getElementById('filterEducation');
  const filterExperience = document.getElementById('filterExperience');
  const resetAllFiltersBtn = document.getElementById('resetAllFiltersBtn');
  const manualEditToggle = document.getElementById('manualEditModeToggle');
  const manualModeLabel = document.getElementById('manualModeLabel');
  const selectAllCheckbox = document.getElementById('selectAllCheckbox');
  const batchActionBar = document.getElementById('batchActionBar');
  const batchSelectedCount = document.getElementById('batchSelectedCount');
  const tabActiveBtn = document.getElementById('tabActive');
  const tabEliminatedBtn = document.getElementById('tabEliminated');
  const tabArchiveBtn = document.getElementById('tabArchive');
  const tabCountActive = document.getElementById('tabCountActive');
  const tabCountEliminated = document.getElementById('tabCountEliminated');
  const tabCountArchive = document.getElementById('tabCountArchive');

  // Modallar
  const candidateDetailDrawer = document.getElementById('candidateDetailDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerTitle = document.getElementById('drawerTitle');
  const drawerBody = document.getElementById('drawerBody');
  const drawerFooter = document.getElementById('drawerFooter');

  const authModal = document.getElementById('authModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const authCompanyForm = document.getElementById('authCompanyForm');
  const companyNameInput = document.getElementById('companyNameInput');
  const companyVoenInput = document.getElementById('companyVoenInput');
  const companyEmailInput = document.getElementById('companyEmailInput');
  const companyPasswordInput = document.getElementById('companyPasswordInput');
  const companyBranchesInput = document.getElementById('companyBranchesInput');
  const companyPlanSelect = document.getElementById('companyPlanSelect');

  const geminiKeyModal = document.getElementById('geminiKeyModal');
  const closeGeminiKeyModalBtn = document.getElementById('closeGeminiKeyModalBtn');
  const cancelGeminiKeyBtn = document.getElementById('cancelGeminiKeyBtn');
  const saveGeminiKeyBtn = document.getElementById('saveGeminiKeyBtn');
  const geminiKeyInput = document.getElementById('geminiKeyInput');
  const openGeminiKeyChatBtn = document.getElementById('openGeminiKeyChatBtn');

  const bulkUploadModal = document.getElementById('bulkUploadModal');
  const openBulkUploadBtn = document.getElementById('openBulkUploadBtn');
  const closeBulkUploadBtn = document.getElementById('closeBulkUploadBtn');
  const cancelUploadBtn = document.getElementById('cancelUploadBtn');
  const startAiScreeningBtn = document.getElementById('startAiScreeningBtn');
  const cvFileInput = document.getElementById('cvFileInput');
  const dropZone = document.getElementById('dropZone');
  const uploadProgressContainer = document.getElementById('uploadProgressContainer');
  const uploadProgressBar = document.getElementById('uploadProgressBar');
  const uploadPercent = document.getElementById('uploadPercent');
  const uploadStatusText = document.getElementById('uploadStatusText');
  const uploadFileList = document.getElementById('uploadFileList');
  const uploadBranchSelect = document.getElementById('uploadBranchSelect');

  const exportExcelBtn = document.getElementById('exportExcelBtn');

  // Hired.ai Bot
  const toggleBotBtn = document.getElementById('toggleBotBtn');
  const aiChatCard = document.getElementById('aiChatCard');
  const minimizeChatBtn = document.getElementById('minimizeChatBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  // -------------------------------------------------------------
  // 4. DRAWER NAVİQASİYASI VƏ AÇILIB-BAĞLANMASI
  // -------------------------------------------------------------
  function openNavDrawer() {
    navDrawer.classList.remove('-translate-x-full');
    navDrawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
    navDrawerOverlay.classList.add('opacity-100');
  }

  function closeNavDrawer() {
    navDrawer.classList.add('-translate-x-full');
    navDrawerOverlay.classList.remove('opacity-100');
    navDrawerOverlay.classList.add('opacity-0', 'pointer-events-none');
  }

  hamburgerBtn.addEventListener('click', openNavDrawer);
  closeNavDrawerBtn.addEventListener('click', closeNavDrawer);
  navDrawerOverlay.addEventListener('click', closeNavDrawer);

  function switchToView(viewName) {
    currentView = viewName;
    if (viewName === 'pricing') {
      candidatesSection.classList.add('hidden');
      pricingSection.classList.remove('hidden');
      pricingSection.classList.add('flex');
    } else {
      pricingSection.classList.add('hidden');
      pricingSection.classList.remove('flex');
      candidatesSection.classList.remove('hidden');
    }
  }

  function selectTab(tabKey) {
    switchToView('candidates');
    currentTab = tabKey;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabKey) {
        btn.classList.add('bg-white', 'text-brand-800', 'shadow-sm', 'font-semibold');
        btn.classList.remove('text-textSecondary', 'font-medium');
      } else {
        btn.classList.remove('bg-white', 'text-brand-800', 'shadow-sm', 'font-semibold');
        btn.classList.add('text-textSecondary', 'font-medium');
      }
    });

    // Drawer links highlight
    [drawerLinkActive, drawerLinkEliminated, drawerLinkArchive, drawerLinkPricing].forEach(el => {
      el.classList.remove('bg-brand-50', 'text-brand-900', 'border', 'border-brand-200/60');
      el.classList.add('text-textSecondary');
    });

    if (tabKey === 'active') {
      drawerLinkActive.classList.add('bg-brand-50', 'text-brand-900', 'border', 'border-brand-200/60');
      drawerLinkActive.classList.remove('text-textSecondary');
    } else if (tabKey === 'eliminated') {
      drawerLinkEliminated.classList.add('bg-brand-50', 'text-brand-900', 'border', 'border-brand-200/60');
      drawerLinkEliminated.classList.remove('text-textSecondary');
    } else if (tabKey === 'archive') {
      drawerLinkArchive.classList.add('bg-brand-50', 'text-brand-900', 'border', 'border-brand-200/60');
      drawerLinkArchive.classList.remove('text-textSecondary');
    }

    selectedCandidateIds.clear();
    renderTable();
  }

  drawerLinkActive.addEventListener('click', () => {
    selectTab('active');
    closeNavDrawer();
  });

  drawerLinkEliminated.addEventListener('click', () => {
    selectTab('eliminated');
    closeNavDrawer();
  });

  drawerLinkArchive.addEventListener('click', () => {
    selectTab('archive');
    closeNavDrawer();
  });

  drawerLinkPricing.addEventListener('click', () => {
    switchToView('pricing');
    closeNavDrawer();
  });

  openPricingBtn.addEventListener('click', () => {
    switchToView('pricing');
  });

  backToCandidatesBtn.addEventListener('click', () => {
    switchToView('candidates');
  });

  logoClickHome.addEventListener('click', () => {
    selectTab('active');
  });

  bentoCardActive.addEventListener('click', () => selectTab('active'));
  bentoCardEliminated.addEventListener('click', () => selectTab('eliminated'));
  bentoCardArchive.addEventListener('click', () => selectTab('archive'));

  // -------------------------------------------------------------
  // 5. KORPORATİV ŞİRKƏT PROFİLİ VƏ QEYDİYYAT MODALI
  // -------------------------------------------------------------
  function syncCompanyProfileUI() {
    topbarCompanyName.textContent = companyProfile.name;
    topbarCompanyVoen.textContent = `VÖEN: ${companyProfile.voen}`;
    topbarCompanyPlan.textContent = `${companyProfile.plan} (Aktiv)`;
    topbarCompanyBranches.textContent = `• ${companyProfile.branches} filial`;

    drawerCompanyName.textContent = companyProfile.name;
    drawerCompanyVoen.textContent = `VÖEN: ${companyProfile.voen}`;
    drawerCompanyPlan.textContent = companyProfile.plan;

    const initials = companyProfile.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'SC';
    drawerCompanyAvatar.textContent = initials;

    // Form inputs
    companyNameInput.value = companyProfile.name;
    companyVoenInput.value = companyProfile.voen;
    companyEmailInput.value = companyProfile.email || 'hr@socar.az';
    companyBranchesInput.value = companyProfile.branches;
    companyPlanSelect.value = companyProfile.plan;
  }

  function openAuthModal() {
    authModal.classList.remove('hidden');
  }

  function closeAuthModal() {
    authModal.classList.add('hidden');
  }

  openAuthModalBtn.addEventListener('click', openAuthModal);
  drawerEditCompanyBtn.addEventListener('click', () => {
    closeNavDrawer();
    openAuthModal();
  });
  drawerAuthModalBtn.addEventListener('click', () => {
    closeNavDrawer();
    openAuthModal();
  });
  closeAuthModalBtn.addEventListener('click', closeAuthModal);

  authCompanyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const voen = companyVoenInput.value.trim();
    if (!/^\d{10}$/.test(voen)) {
      alert('Zəhmət olmasa Azərbaycan VÖEN-i üçün 10 rəqəmli düzgün nömrə daxil edin.');
      return;
    }

    companyProfile = {
      name: companyNameInput.value.trim(),
      voen: voen,
      email: companyEmailInput.value.trim(),
      plan: companyPlanSelect.value,
      branches: parseInt(companyBranchesInput.value) || 12
    };

    try {
      localStorage.setItem('hired_company_profile', JSON.stringify(companyProfile));
      // Backend sinxronizasiyası
      fetch('/api/company/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyProfile)
      }).catch(err => console.warn('Backend sync:', err));
    } catch (err) {}

    syncCompanyProfileUI();
    closeAuthModal();
    showToast(`Şirkət uğurla yeniləndi: "${companyProfile.name}" (VÖEN: ${companyProfile.voen})`);
  });

  // -------------------------------------------------------------
  // 6. PAKETLƏR VƏ TARİFLƏRİN SEÇİLMƏSİ
  // -------------------------------------------------------------
  document.querySelectorAll('.select-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedPlan = btn.getAttribute('data-plan');
      companyProfile.plan = selectedPlan;
      try {
        localStorage.setItem('hired_company_profile', JSON.stringify(companyProfile));
        fetch('/api/company/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyProfile)
        }).catch(() => {});
      } catch (e) {}

      syncCompanyProfileUI();
      showToast(`Təbriklər! "${selectedPlan}" korporativ abunəliyi aktivləşdirildi.`);
    });
  });

  // -------------------------------------------------------------
  // 7. GEMINI API KEY MODALI VƏ KONFİQURASİYASI
  // -------------------------------------------------------------
  function openGeminiModal() {
    geminiKeyModal.classList.remove('hidden');
    fetch('/api/config/gemini-key')
      .then(res => res.json())
      .then(data => {
        const statusEl = document.getElementById('geminiCurrentStatus');
        if (data.configured) {
          statusEl.textContent = `Aktivdir (${data.masked_key})`;
          statusEl.className = 'font-mono text-[10px] text-emerald-600 font-semibold';
        } else {
          statusEl.textContent = 'Quraşdırılmayıb';
          statusEl.className = 'font-mono text-[10px] text-rose-600 font-semibold';
        }
      })
      .catch(() => {});
  }

  function closeGeminiModal() {
    geminiKeyModal.classList.add('hidden');
  }

  openGeminiKeyHeaderBtn.addEventListener('click', openGeminiModal);
  drawerGeminiKeyBtn.addEventListener('click', () => {
    closeNavDrawer();
    openGeminiModal();
  });
  if (openGeminiKeyChatBtn) {
    openGeminiKeyChatBtn.addEventListener('click', openGeminiModal);
  }
  closeGeminiKeyModalBtn.addEventListener('click', closeGeminiModal);
  cancelGeminiKeyBtn.addEventListener('click', closeGeminiModal);

  saveGeminiKeyBtn.addEventListener('click', async () => {
    const key = geminiKeyInput.value.trim();
    if (!key) {
      alert('Zəhmət olmasa API açarını daxil edin.');
      return;
    }

    try {
      const resp = await fetch('/api/config/gemini-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key })
      });
      const data = await resp.json();
      showToast('Gemini API Açarı uğurla yadda saxlanıldı!');
      closeGeminiModal();
    } catch (e) {
      showToast('Açar saxlanarkən xəta baş verdi.');
    }
  });

  // -------------------------------------------------------------
  // 8. CƏDVƏL, FİLTR VƏ AXTARIŞ SİSTEMİ
  // -------------------------------------------------------------
  function getFilteredCandidates() {
    return candidates.filter(c => {
      // Tab Filter
      if (c.tabCategory !== currentTab) return false;

      // Text Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchRole = c.role.toLowerCase().includes(q);
        const matchBranch = c.branch.toLowerCase().includes(q);
        const matchPhone = c.phone.includes(q);
        const matchSkills = c.skills && c.skills.some(s => s.toLowerCase().includes(q));
        if (!matchName && !matchRole && !matchBranch && !matchPhone && !matchSkills) {
          return false;
        }
      }

      // Work Mode Filter
      if (filters.workMode !== 'all' && c.workMode !== filters.workMode) {
        return false;
      }

      // Branch Filter
      if (filters.branch !== 'all' && c.branch !== filters.branch) {
        return false;
      }

      // Education Filter
      if (filters.education !== 'all' && !c.education.includes(filters.education)) {
        return false;
      }

      // Experience Filter
      if (filters.experience !== 'all') {
        if (filters.experience === '0-1' && c.expYears > 1) return false;
        if (filters.experience === '1-3' && (c.expYears < 1 || c.expYears > 3)) return false;
        if (filters.experience === '3-5' && (c.expYears < 3 || c.expYears > 5)) return false;
        if (filters.experience === '5+' && c.expYears < 5) return false;
      }

      return true;
    });
  }

  function renderTable() {
    const list = getFilteredCandidates();
    filteredResultsCount.textContent = `${list.length} nəticə tapıldı`;
    document.getElementById('paginationRange').textContent = list.length > 0 ? `1-${list.length}` : '0';
    document.getElementById('paginationTotal').textContent = list.length;

    if (currentTab === 'active') {
      tableTitle.textContent = 'Aktiv Yoxlanmış Namizədlər Siyahısı (Etibarlı Baza)';
    } else if (currentTab === 'eliminated') {
      tableTitle.textContent = 'Eliminə Olunanlar & Süni İntellektlə Bloklanmış Botlar';
    } else {
      tableTitle.textContent = 'Ümumi Arxiv və Əvvəlki Seçim Qeydləri';
    }

    if (list.length === 0) {
      tableBody.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    let html = '';
    list.forEach(item => {
      const isChecked = selectedCandidateIds.has(item.id);

      // Score Badge Colors
      let scoreBadge = '';
      if (item.aiScore >= 85) {
        scoreBadge = `
          <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded badge-emerald font-mono font-bold text-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>🟢 ${item.aiScore}% Etibarlı</span>
          </div>
        `;
      } else if (item.aiScore >= 60) {
        scoreBadge = `
          <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded badge-amber font-mono font-bold text-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>🟡 ${item.aiScore}% HR Yoxlaması</span>
          </div>
        `;
      } else {
        scoreBadge = `
          <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded badge-crimson font-mono font-bold text-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>🔴 ${item.aiScore}% Saxta / Bot</span>
          </div>
        `;
      }

      // Verdict Badge
      let verdictBadge = '';
      if (item.aiVerdict === 'Təsdiqləndi') {
        verdictBadge = `<span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">Təsdiqləndi</span>`;
      } else if (item.aiVerdict === 'Eliminə olundu') {
        verdictBadge = `<span class="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold">Eliminə olundu</span>`;
      } else {
        verdictBadge = `<span class="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">Gözləmədə</span>`;
      }

      // Work mode pill
      let workModePill = `<span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">${item.workMode}</span>`;

      // Quick Actions depending on tab
      let actionButtons = `
        <div class="flex items-center justify-end gap-1">
          <button onclick="window.viewCandidateDetail('${item.id}')" class="px-2 py-1 rounded bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium text-[11px] flex items-center gap-1 transition-colors" title="CV və AI analizi aç">
            <span class="material-symbols-outlined text-[13px]">visibility</span>
            <span>Bax</span>
          </button>
      `;

      if (item.tabCategory === 'eliminated' || item.tabCategory === 'archive') {
        actionButtons += `
          <button onclick="window.restoreCandidate('${item.id}')" class="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-textSecondary font-medium text-[11px] flex items-center gap-1 transition-colors" title="Aktiv siyahıya bərpa et">
            <span class="material-symbols-outlined text-[13px] text-emerald-600">replay</span>
            <span>Bərpa et</span>
          </button>
        `;
      } else {
        actionButtons += `
          <button onclick="window.manualApprove('${item.id}')" class="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium text-[11px] flex items-center gap-1 transition-colors" title="Manual Təsdiqlə">
            <span class="material-symbols-outlined text-[13px]">done</span>
            <span>Təsdiq</span>
          </button>
        `;
      }

      actionButtons += `
          <button onclick="window.deleteCandidate('${item.id}')" class="p-1 rounded text-textTertiary hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Sil">
            <span class="material-symbols-outlined text-[14px]">delete</span>
          </button>
        </div>
      `;

      let manualIndicator = manualEditMode ? `
        <span class="inline-block w-2 h-2 rounded-full bg-brand-500 animate-ping mr-1" title="Manual rejim aktivdir"></span>
      ` : '';

      html += `
        <tr class="candidate-row ${isChecked ? 'selected' : ''} hover:bg-subtle transition-colors cursor-pointer" onclick="window.handleRowClick(event, '${item.id}')">
          <td class="py-2.5 px-3 text-center" onclick="event.stopPropagation()">
            <input type="checkbox" class="candidate-check w-3.5 h-3.5 rounded border-borderDark text-brand-600 accent-brand-600 cursor-pointer"
              data-id="${item.id}" ${isChecked ? 'checked' : ''} onchange="window.toggleCandidateSelection('${item.id}', this.checked)" />
          </td>
          <td class="py-2.5 px-3">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs shrink-0 border border-brand-200">
                ${item.avatar}
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  ${manualIndicator}
                  <span class="font-semibold text-textPrimary hover:text-brand-600 transition-colors truncate">${item.name}</span>
                  <span class="text-[10px] font-mono text-textTertiary">${item.id}</span>
                </div>
                <div class="text-[11px] text-textSecondary font-medium truncate">${item.role}</div>
                <div class="text-[10px] text-textTertiary font-mono truncate">${item.phone} • ${item.email}</div>
              </div>
            </div>
          </td>
          <td class="py-2.5 px-3">
            <div class="flex flex-col">
              <span class="font-medium text-textPrimary flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px] text-brand-600">near_me</span>
                <span>${item.branch}</span>
              </span>
              <span class="text-[10.5px] text-textTertiary font-mono">${item.distance} məsafə</span>
            </div>
          </td>
          <td class="py-2.5 px-3">
            ${workModePill}
          </td>
          <td class="py-2.5 px-3">
            <div class="flex flex-col">
              <span class="text-textPrimary font-medium truncate">${item.education}</span>
              <span class="text-[11px] text-textSecondary">${item.experience} təcrübə</span>
            </div>
          </td>
          <td class="py-2.5 px-3">
            ${scoreBadge}
          </td>
          <td class="py-2.5 px-3">
            ${verdictBadge}
          </td>
          <td class="py-2.5 px-3 text-right" onclick="event.stopPropagation()">
            ${actionButtons}
          </td>
        </tr>
      `;
    });

    tableBody.innerHTML = html;
    updateBatchBar();
    updateMetrics();
  }

  function updateMetrics() {
    const verified = candidates.filter(c => c.tabCategory === 'active').length;
    const bots = candidates.filter(c => c.tabCategory === 'eliminated').length;
    const archive = candidates.filter(c => c.tabCategory === 'archive').length;

    metricVerified.textContent = verified;
    metricBot.textContent = bots;
    metricArchive.textContent = archive;

    tabCountActive.textContent = verified;
    tabCountEliminated.textContent = bots;
    tabCountArchive.textContent = archive;

    drawerBadgeActive.textContent = verified;
    drawerBadgeEliminated.textContent = bots;
    drawerBadgeArchive.textContent = archive;
  }

  function updateBatchBar() {
    if (selectedCandidateIds.size > 0) {
      batchActionBar.classList.remove('hidden');
      batchSelectedCount.textContent = selectedCandidateIds.size;
    } else {
      batchActionBar.classList.add('hidden');
    }

    const currentList = getFilteredCandidates();
    if (currentList.length > 0 && selectedCandidateIds.size === currentList.length) {
      selectAllCheckbox.checked = true;
    } else {
      selectAllCheckbox.checked = false;
    }
  }

  // Event Listeners for Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectTab(btn.getAttribute('data-tab'));
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTable();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  filterWorkMode.addEventListener('change', (e) => {
    filters.workMode = e.target.value;
    renderTable();
  });

  filterBranch.addEventListener('change', (e) => {
    filters.branch = e.target.value;
    renderTable();
  });

  filterEducation.addEventListener('change', (e) => {
    filters.education = e.target.value;
    renderTable();
  });

  filterExperience.addEventListener('change', (e) => {
    filters.experience = e.target.value;
    renderTable();
  });

  function resetFilters() {
    searchQuery = '';
    searchInput.value = '';
    filters = {
      workMode: 'all',
      branch: 'all',
      education: 'all',
      experience: 'all'
    };
    filterWorkMode.value = 'all';
    filterBranch.value = 'all';
    filterEducation.value = 'all';
    filterExperience.value = 'all';
    renderTable();
  }

  resetAllFiltersBtn.addEventListener('click', resetFilters);
  emptyStateResetBtn.addEventListener('click', resetFilters);

  manualEditToggle.addEventListener('click', () => {
    manualEditMode = !manualEditMode;
    if (manualEditMode) {
      manualModeLabel.textContent = 'Manual Düzəliş Rejimi: AÇIQ';
      manualEditToggle.classList.add('bg-brand-50', 'border-brand-500', 'text-brand-700');
      showToast('Manual düzəliş rejimi aktivləşdirildi.');
    } else {
      manualModeLabel.textContent = 'Manual Düzəliş Rejimi: Qapalı';
      manualEditToggle.classList.remove('bg-brand-50', 'border-brand-500', 'text-brand-700');
    }
    renderTable();
  });

  selectAllCheckbox.addEventListener('change', (e) => {
    const list = getFilteredCandidates();
    if (e.target.checked) {
      list.forEach(item => selectedCandidateIds.add(item.id));
    } else {
      selectedCandidateIds.clear();
    }
    renderTable();
  });

  window.toggleCandidateSelection = function(id, isChecked) {
    if (isChecked) {
      selectedCandidateIds.add(id);
    } else {
      selectedCandidateIds.delete(id);
    }
    updateBatchBar();
  };

  window.handleRowClick = function(event, id) {
    window.viewCandidateDetail(id);
  };

  // -------------------------------------------------------------
  // 9. TOPLU ƏMƏLİYYATLAR VƏ MANUAL ACTIONS
  // -------------------------------------------------------------
  document.getElementById('batchApproveBtn').addEventListener('click', () => {
    candidates.forEach(c => {
      if (selectedCandidateIds.has(c.id)) {
        c.aiVerdict = 'Təsdiqləndi';
        c.tabCategory = 'active';
        c.aiScore = Math.max(c.aiScore, 90);
      }
    });
    showToast(`${selectedCandidateIds.size} namizəd uğurla təsdiqləndi!`);
    selectedCandidateIds.clear();
    renderTable();
  });

  document.getElementById('batchArchiveBtn').addEventListener('click', () => {
    candidates.forEach(c => {
      if (selectedCandidateIds.has(c.id)) {
        c.tabCategory = 'archive';
      }
    });
    showToast(`${selectedCandidateIds.size} namizəd ümumi arxivə köçürüldü.`);
    selectedCandidateIds.clear();
    renderTable();
  });

  document.getElementById('batchDeleteBtn').addEventListener('click', () => {
    if (confirm(`Seçilmiş ${selectedCandidateIds.size} namizədi bazadan silmək istədiyinizə əminsiniz?`)) {
      candidates = candidates.filter(c => !selectedCandidateIds.has(c.id));
      showToast('Seçilmiş namizədlər bazadan silindi.');
      selectedCandidateIds.clear();
      renderTable();
    }
  });

  window.restoreCandidate = function(id) {
    const target = candidates.find(c => c.id === id);
    if (target) {
      target.tabCategory = 'active';
      target.aiVerdict = 'Təsdiqləndi';
      if (target.aiScore < 70) target.aiScore = 85;

      // Backend sinxronizasiyası
      fetch(`/api/candidates/${id}/override`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'new_verdict=Təsdiqləndi'
      }).catch(() => {});

      showToast(`${target.name} uğurla Aktiv Namizədlər siyahısına bərpa edildi!`);
      renderTable();
      if (activeDetailCandidate && activeDetailCandidate.id === id) {
        window.viewCandidateDetail(id);
      }
    }
  };

  window.manualApprove = function(id) {
    const target = candidates.find(c => c.id === id);
    if (target) {
      target.aiVerdict = 'Təsdiqləndi';
      target.aiScore = 95;

      fetch(`/api/candidates/${id}/override`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'new_verdict=Təsdiqləndi'
      }).catch(() => {});

      showToast(`${target.name} manual olaraq təsdiqləndi.`);
      renderTable();
      if (activeDetailCandidate && activeDetailCandidate.id === id) {
        window.viewCandidateDetail(id);
      }
    }
  };

  window.deleteCandidate = function(id) {
    const target = candidates.find(c => c.id === id);
    if (!target) return;
    if (confirm(`"${target.name}" qeydini silmək istəyirsiniz?`)) {
      candidates = candidates.filter(c => c.id !== id);
      selectedCandidateIds.delete(id);

      fetch(`/api/candidates/${id}`, { method: 'DELETE' }).catch(() => {});

      showToast('Qeyd silindi.');
      renderTable();
      closeDrawer();
    }
  };

  // -------------------------------------------------------------
  // 10. CANDIDATE DETAIL DRAWER (AI DETAL ANALİZİ)
  // -------------------------------------------------------------
  window.viewCandidateDetail = function(id) {
    const candidate = candidates.find(c => c.id === id);
    if (!candidate) return;
    activeDetailCandidate = candidate;

    drawerTitle.textContent = `${candidate.name} — AI Detallı Skrininq`;

    let trustColor = candidate.aiScore >= 80 ? 'text-emerald-600' : (candidate.aiScore >= 60 ? 'text-amber-600' : 'text-rose-600');
    let trustProgressColor = candidate.aiScore >= 80 ? 'bg-emerald-500' : (candidate.aiScore >= 60 ? 'bg-amber-500' : 'bg-rose-500');

    drawerBody.innerHTML = `
      <!-- Candidate Profile Card -->
      <div class="bg-canvas border border-borderGray rounded-lg p-4">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-base shadow-sm">
              ${candidate.avatar}
            </div>
            <div>
              <h4 class="font-bold text-sm text-textPrimary">${candidate.name}</h4>
              <p class="text-xs text-brand-700 font-semibold">${candidate.role}</p>
              <p class="text-[11px] font-mono text-textTertiary mt-0.5">${candidate.id} • ${candidate.date}</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-subtle text-textSecondary font-mono text-xs font-semibold">
            ${candidate.aiVerdict}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-borderGray text-xs">
          <div>
            <span class="text-textTertiary block text-[10px]">Telefon:</span>
            <span class="font-mono text-textPrimary font-medium">${candidate.phone}</span>
          </div>
          <div>
            <span class="text-textTertiary block text-[10px]">E-poçt:</span>
            <span class="font-mono text-textPrimary font-medium truncate block">${candidate.email}</span>
          </div>
          <div>
            <span class="text-textTertiary block text-[10px]">Filial Məsafəsi:</span>
            <span class="text-textPrimary font-medium">${candidate.branch} (${candidate.distance})</span>
          </div>
          <div>
            <span class="text-textTertiary block text-[10px]">İş Rejimi:</span>
            <span class="text-textPrimary font-medium">${candidate.workMode}</span>
          </div>
        </div>
      </div>

      <!-- AI Trust Score Diagnostic Box -->
      <div class="bg-canvas border border-borderGray rounded-lg p-4 space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px] text-brand-700">psychology</span>
            <span class="font-bold text-xs text-textPrimary">Hired.ai Güvən Skoru</span>
          </div>
          <span class="font-mono text-sm font-bold ${trustColor}">${candidate.aiScore}%</span>
        </div>

        <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div class="${trustProgressColor} h-full transition-all duration-500" style="width: ${candidate.aiScore}%"></div>
        </div>

        <!-- Diagnostic List -->
        <div class="space-y-2 pt-1 text-xs">
          <div class="flex items-start justify-between">
            <span class="text-textSecondary">1. Temp-mail / Domen Yoxlanışı:</span>
            <span class="font-medium text-right text-textPrimary max-w-[200px]">${candidate.aiAnalysis.tempMail}</span>
          </div>
          <div class="flex items-start justify-between">
            <span class="text-textSecondary">2. Anti-bot & Skript Barmaq İzi:</span>
            <span class="font-medium text-right text-textPrimary max-w-[200px]">${candidate.aiAnalysis.antiBot}</span>
          </div>
          <div class="flex items-start justify-between">
            <span class="text-textSecondary">3. Filiala Uyğunluq (Geo-Matching):</span>
            <span class="font-medium text-right text-textPrimary max-w-[200px]">${candidate.aiAnalysis.geoMatch}</span>
          </div>
          <div class="flex items-start justify-between">
            <span class="text-textSecondary">4. Təcrübə Tarixçəsi Uyğunluğu:</span>
            <span class="font-medium text-right text-textPrimary max-w-[200px]">${candidate.aiAnalysis.expCoherence}</span>
          </div>
        </div>
      </div>

      <!-- Skills and Tags -->
      <div class="bg-canvas border border-borderGray rounded-lg p-4">
        <span class="text-[10px] font-semibold text-textTertiary uppercase tracking-wider block mb-2">Aşkar Edilən Əsas Bacarıqlar (AI Parsed)</span>
        <div class="flex flex-wrap gap-1.5">
          ${candidate.skills ? candidate.skills.map(s => `
            <span class="px-2 py-0.5 rounded bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-medium font-mono">${s}</span>
          `).join('') : '<span class="text-textTertiary text-xs">Bacarıqlar aşkar edilmədi</span>'}
        </div>
      </div>

      <!-- Education & Work History Preview -->
      <div class="bg-canvas border border-borderGray rounded-lg p-4 text-xs space-y-1.5">
        <span class="text-[10px] font-semibold text-textTertiary uppercase tracking-wider block">Təhsil & Təcrübə Sənədləri</span>
        <p class="text-textPrimary font-medium">${candidate.education}</p>
        <p class="text-textSecondary">${candidate.experience} ümumi sahə stajı.</p>
      </div>
    `;

    drawerFooter.innerHTML = `
      <div class="flex items-center gap-2">
        <button onclick="window.deleteCandidate('${candidate.id}')" class="px-2.5 py-1.5 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-medium flex items-center gap-1 transition-colors">
          <span class="material-symbols-outlined text-[14px]">delete</span>
          <span>Sil</span>
        </button>
      </div>
      <div class="flex items-center gap-2">
        ${candidate.tabCategory === 'eliminated' || candidate.tabCategory === 'archive' ? `
          <button onclick="window.restoreCandidate('${candidate.id}')" class="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors">
            <span class="material-symbols-outlined text-[14px]">replay</span>
            <span>Aktiv Siyahıya Bərpa Et</span>
          </button>
        ` : `
          <button onclick="window.manualApprove('${candidate.id}')" class="px-3 py-1.5 rounded bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors">
            <span class="material-symbols-outlined text-[14px]">verified</span>
            <span>Manual Təsdiq</span>
          </button>
        `}
      </div>
    `;

    candidateDetailDrawer.classList.remove('hidden');
  };

  function closeDrawer() {
    candidateDetailDrawer.classList.add('hidden');
    activeDetailCandidate = null;
  }

  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);

  // -------------------------------------------------------------
  // 11. DƏBƏDƏBƏLİ NAVY BLUE EXCEL (.XLSX) İXRACI
  // -------------------------------------------------------------
  exportExcelBtn.addEventListener('click', () => {
    showToast('Rəsmi Excel (.xlsx) faylı generasiya olunur...');
    // Real FastAPI openpyxl streaming endpoint
    window.location.href = `/api/export-excel?tab=${currentTab}`;
  });

  // -------------------------------------------------------------
  // 12. REAL CV FAYLI YÜKLƏMƏ VƏ PARSİNQ (PDF, DOCX, TXT)
  // -------------------------------------------------------------
  openBulkUploadBtn.addEventListener('click', () => {
    bulkUploadModal.classList.remove('hidden');
    uploadFileList.innerHTML = '';
    uploadProgressContainer.classList.add('hidden');
    startAiScreeningBtn.disabled = true;
  });

  function closeBulkModal() {
    bulkUploadModal.classList.add('hidden');
  }

  closeBulkUploadBtn.addEventListener('click', closeBulkModal);
  cancelUploadBtn.addEventListener('click', closeBulkModal);

  cvFileInput.addEventListener('change', (e) => {
    handleSelectedFiles(Array.from(e.target.files));
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-brand-600', 'bg-brand-50/20');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-brand-600', 'bg-brand-50/20');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-brand-600', 'bg-brand-50/20');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSelectedFiles(Array.from(e.dataTransfer.files));
    }
  });

  let selectedFilesForUpload = [];

  function handleSelectedFiles(files) {
    selectedFilesForUpload = files;
    if (files.length === 0) return;

    uploadFileList.innerHTML = files.map((f) => `
      <div class="flex items-center justify-between p-2 rounded bg-canvas border border-borderGray">
        <div class="flex items-center gap-2 truncate">
          <span class="material-symbols-outlined text-[16px] text-brand-700">description</span>
          <span class="font-medium truncate">${f.name}</span>
          <span class="text-[10px] text-textTertiary font-mono">(${(f.size / 1024).toFixed(1)} KB)</span>
        </div>
        <span class="text-emerald-600 font-mono text-[10px] font-semibold">Hazırdır</span>
      </div>
    `).join('');

    startAiScreeningBtn.disabled = false;
  }

  startAiScreeningBtn.addEventListener('click', async () => {
    if (selectedFilesForUpload.length === 0) return;

    uploadProgressContainer.classList.remove('hidden');
    startAiScreeningBtn.disabled = true;
    let targetBranch = uploadBranchSelect.value;

    let processedCount = 0;
    for (let i = 0; i < selectedFilesForUpload.length; i++) {
      const file = selectedFilesForUpload[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('branch', targetBranch);

      uploadStatusText.textContent = `"${file.name}" təhlil edilir (pypdf/docx & AI)...`;
      uploadProgressBar.style.width = `${Math.round(((i + 1) / selectedFilesForUpload.length) * 100)}%`;
      uploadPercent.textContent = `${Math.round(((i + 1) / selectedFilesForUpload.length) * 100)}%`;

      try {
        const resp = await fetch('/api/upload-cv', {
          method: 'POST',
          body: formData
        });
        if (resp.ok) {
          const result = await resp.json();
          if (result && result.candidate) {
            candidates.unshift(result.candidate);
            processedCount++;
          }
        }
      } catch (err) {
        console.warn('Upload error:', err);
      }
    }

    uploadStatusText.textContent = 'Bütün CV-lər emal edildi və bazaya əlavə olundu!';
    setTimeout(() => {
      closeBulkModal();
      showToast(`${processedCount} ədəd real CV uğurla təhlil olundu və hədəf filialla uyğunlaşdırıldı.`);
      renderTable();
    }, 500);
  });

  // -------------------------------------------------------------
  // 13. FLOATING HIRED.AI CHATBOT (GEMINI 2.5 FLASH)
  // -------------------------------------------------------------
  toggleBotBtn.addEventListener('click', () => {
    aiChatCard.classList.toggle('hidden');
    if (!aiChatCard.classList.contains('hidden')) {
      chatInput.focus();
    }
  });

  minimizeChatBtn.addEventListener('click', () => {
    aiChatCard.classList.add('hidden');
  });

  document.querySelectorAll('.quick-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-query');
      handleAiChatQuery(q);
    });
  });

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    handleAiChatQuery(text);
  });

  async function handleAiChatQuery(query) {
    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'flex justify-end';
    userMsg.innerHTML = `
      <div class="bg-brand-800 text-white p-2.5 rounded-xl rounded-tr-none shadow-xs max-w-[85%] text-xs">
        <p>${escapeHtml(query)}</p>
        <span class="text-[9px] text-brand-200 block text-right mt-1 font-mono">İndi</span>
      </div>
    `;
    chatMessages.appendChild(userMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Loading indicator
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'flex items-start gap-2 max-w-[92%] animate-pulse';
    loadingMsg.innerHTML = `
      <div class="w-6 h-6 rounded bg-brand-800 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
        AI
      </div>
      <div class="bg-surface border border-borderGray p-2.5 rounded-xl rounded-tl-none text-textTertiary text-xs">
        Hired.ai düşünür və təhlil edir...
      </div>
    `;
    chatMessages.appendChild(loadingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      loadingMsg.remove();

      let answer = '';
      let engine = 'Gemini 2.5 Flash';
      if (resp.ok) {
        const data = await resp.json();
        answer = data.response;
        engine = data.engine || 'Gemini 2.5 Flash';

        // Auto filter triggers
        if (data.appliedFilter) {
          if (data.appliedFilter.branch) {
            selectTab('active');
            filters.branch = data.appliedFilter.branch;
            filterBranch.value = data.appliedFilter.branch;
            renderTable();
          } else if (data.appliedFilter.tab) {
            selectTab(data.appliedFilter.tab);
          }
        }
      } else {
        answer = 'Sistem xətası baş verdi. Zəhmət olmasa təkrar cəhd edin.';
      }

      // Format markdown bold and newlines
      const formattedAnswer = formatAiMessage(answer);

      const aiMsg = document.createElement('div');
      aiMsg.className = 'flex items-start gap-2 max-w-[92%] animate-in fade-in duration-200';
      aiMsg.innerHTML = `
        <div class="w-6 h-6 rounded bg-brand-800 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
          AI
        </div>
        <div class="bg-surface border border-borderGray p-3 rounded-xl rounded-tl-none shadow-xs text-textPrimary leading-relaxed space-y-1.5">
          <div class="text-[10px] text-brand-600 font-mono font-semibold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Mühərrik: ${engine}</span>
          </div>
          <div>${formattedAnswer}</div>
          <span class="text-[9px] text-textTertiary block text-right font-mono">İndi</span>
        </div>
      `;
      chatMessages.appendChild(aiMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (e) {
      loadingMsg.remove();
      const errorMsg = document.createElement('div');
      errorMsg.className = 'flex items-start gap-2 max-w-[92%]';
      errorMsg.innerHTML = `
        <div class="w-6 h-6 rounded bg-rose-700 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
          !
        </div>
        <div class="bg-rose-50 border border-rose-200 p-2.5 rounded-xl rounded-tl-none text-rose-800 text-xs">
          Server ilə əlaqə qurula bilmədi. Zəhmət olmasa FastAPI serverinin aktivliyini yoxlayın.
        </div>
      `;
      chatMessages.appendChild(errorMsg);
    }
  }

  function formatAiMessage(text) {
    if (!text) return '';
    let res = escapeHtml(text);
    // Bold **text**
    res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    res = res.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Bullet points
    res = res.replace(/• (.*?)(?:\n|$)/g, '<div class="flex items-start gap-1 py-0.5"><span class="text-brand-600">•</span><span>$1</span></div>');
    // Newlines
    res = res.replace(/\n\n/g, '<div class="h-2"></div>');
    res = res.replace(/\n/g, '<br/>');
    return res;
  }

  // -------------------------------------------------------------
  // 14. TOAST BİLDİRİŞLƏRİ VƏ KÖMƏKÇİ FUNKSİYALAR
  // -------------------------------------------------------------
  function showToast(message) {
    const existing = document.getElementById('hiredToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'hiredToast';
    toast.className = 'fixed top-18 right-4 z-50 bg-brand-900 text-white text-xs px-3.5 py-2.5 rounded-lg shadow-xl border border-brand-700 flex items-center gap-2 animate-in fade-in duration-150';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[17px] text-emerald-400">check_circle</span>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // İlkin Yükləmə: Backend-dən namizədləri və şirkət profilini gətir
  async function initLoad() {
    syncCompanyProfileUI();
    try {
      const resp = await fetch('/api/candidates?tab=active');
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.length > 0) {
          // Backend-dən gələn məlumatları birləşdir
          const otherTabs = initialCandidates.filter(c => c.tabCategory !== 'active');
          candidates = [...data, ...otherTabs];
        }
      }
    } catch (e) {
      console.warn('Backend offline, local seed istifadə edilir.');
    }
    renderTable();
  }

  initLoad();
});
