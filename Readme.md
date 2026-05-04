📌 N-PAY (NotchPay Integration Project)

Système de paiement mobile money basé sur NotchPay API, permettant des paiements via MTN Mobile Money et Orange Money avec interface web simple.

🚀 Fonctionnalités
Paiement mobile (MTN / Orange Money)
Génération automatique de transaction
Callback de vérification de paiement
Interface web simple (HTML/CSS/JS)
Backend Node.js (Express)
Intégration NotchPay Direct Charge API
Système de statut paiement (pending / complete / failed)
🛠️ Technologies utilisées
Backend
Node.js
Express.js
Axios
UUID
Dotenv
Frontend
HTML5
CSS3
JavaScript Vanilla
API externe
NotchPay API
📁 Structure du projet
n-pay/
│
├── backend/
│   ├── controllers/
│   │   └── paymentController.js
│   ├── services/
│   │   └── notchpayService.js
│   ├── routes/
│   │   └── paymentRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
⚙️ Installation
1. Cloner le projet
git clone https://github.com/ton-repo/n-pay.git
cd n-pay
2. Backend setup
cd backend
npm install
3. Créer fichier .env
PORT=5000
BASE_URL=http://localhost:5000

NOTCHPAY_PUBLIC_KEY=ta_cle_publique
NOTCHPAY_SECRET_KEY=ta_cle_secrete
4. Lancer le serveur
npm start
🌐 Frontend

Ouvrir :

frontend/index.html

ou utiliser Live Server (VS Code recommandé)

🔌 API Endpoints
📌 Créer un paiement
POST /api/pay

Body :

{
  "phone": "674682921",
  "gateway": "CM_MTNMOMO"
}
📌 Callback NotchPay
GET /api/callback
💳 Modes de paiement
Provider	Gateway value
MTN Mobile	CM_MTNMOMO
Orange Money	CM_ORANGE
🔥 Flow de paiement
User entre numéro
Choisit MTN ou Orange
Frontend envoie requête /api/pay
Backend crée transaction NotchPay
Backend déclenche Direct Charge
Utilisateur valide sur téléphone
Callback confirme paiement
⚠️ Important
Toujours utiliser une clé API valide NotchPay
Utiliser PUBLIC_KEY côté backend pour les requêtes
Ne jamais exposer SECRET_KEY côté frontend
Orange et MTN nécessitent des channels différents
🧪 Test
MTN
+2376XXXXXXXX
Orange
+2376XXXXXXXX
🛡️ Erreurs courantes
❌ Invalid CM Mobile Money
Mauvais channel
Mauvais format téléphone
❌ 401 Unauthorized
Clé API incorrecte
❌ ECONNRESET
Problème réseau / API NotchPay temporaire
🚀 Améliorations possibles
WebSocket paiement temps réel
Dashboard admin
Multi-prix (produits)
Historique transactions
Système d’abonnement
👨‍💻 Auteur

Projet développé pour intégration paiement mobile en Afrique (CMR).

📌 License

Free for educational use.