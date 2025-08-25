# 🌊 SPOTEADO

**The ultimate surf community platform for Mar del Plata, Argentina**

SPOTEADO connects surfers, photographers, and ocean lovers in Mar del Plata. Share surf photos, discover the best spots, and stay updated with real-time conditions along the beautiful Argentine coast.

![SPOTEADO Preview](https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&h=400&fit=crop)

## ✨ Features

### 🗺️ Interactive Map
- Explore all 8+ surf spots along Mar del Plata's coast
- Color-coded difficulty markers
- Detailed spot information with conditions and facilities
- Click markers to see spot details

### 📸 Photo Gallery
- Browse community-uploaded surf photos
- Advanced filtering by spot, date, tags, and photographer
- High-quality photo viewing with detailed metadata
- Like and discover amazing surf shots

### 🏄‍♂️ Spot Guide
- Comprehensive information for each surf spot
- Difficulty levels from Beginner to Expert
- Wave types, best conditions, and hazard warnings
- Facilities and access information

### 📤 Photo Upload
- Easy drag-and-drop photo upload
- Add detailed conditions and metadata
- Tag photos for better discoverability
- Help build the community gallery

### 🌙 Dark Mode
- Beautiful dark theme optimized for surfers
- Ocean-inspired color palette
- Responsive design for all devices

## 🏄‍♀️ Surf Spots Included

1. **Playa Grande** - The main beach with consistent waves (Beginner)
2. **Playa Varese** - Quieter spot with good intermediate waves
3. **La Perla** - Historic beach perfect for beginners
4. **Playa Popular** - Local favorite with less crowds
5. **Cabo Corrientes** - Powerful point break for experts only
6. **Playa Serena** - Secluded beach with clean waves
7. **Waikiki** - Popular spot with surf schools
8. **Playa Chica** - Protected bay ideal for learning

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spoteado.git
cd spoteado
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS + shadcn/ui components
- **Maps:** Leaflet with OpenStreetMap
- **Icons:** Lucide React
- **Typography:** Geist font family
- **Theme:** next-themes for dark mode
- **Date Handling:** date-fns

## 🏗️ Project Structure

```
spoteado/
├── app/                    # Next.js app router pages
│   ├── gallery/           # Photo gallery page
│   ├── map/               # Interactive map page
│   ├── spots/             # Surf spots listing
│   ├── upload/            # Photo upload page
│   └── layout.tsx         # Root layout with navigation
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui base components
│   ├── navigation.tsx    # Main navigation bar
│   ├── map-view.tsx      # Map component wrapper
│   ├── leaflet-map.tsx   # Leaflet map implementation
│   ├── photo-gallery.tsx # Gallery with filtering
│   ├── photo-upload.tsx  # Upload form
│   └── spot-grid.tsx     # Spots listing grid
├── data/                 # Static data
│   ├── surfing-spots.ts  # Mar del Plata spot data
│   └── sample-photos.ts  # Sample photo data
├── types/                # TypeScript interfaces
│   └── index.ts          # App type definitions
└── lib/                  # Utilities
    └── utils.ts          # Helper functions
```

## 🌊 Contributing

We welcome contributions from the Mar del Plata surf community!

### How to Contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution:
- Add more surf spots
- Improve condition data accuracy
- Add real-time weather integration
- Implement user authentication
- Add photo moderation system
- Mobile app development

## 📱 Mobile Support

SPOTEADO is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- Progressive Web App (PWA) ready

## 🔮 Future Features

- Real-time wave and weather data
- User accounts and profiles
- Surf forecasting integration
- Push notifications for good conditions
- Social features and surf buddy finder
- Surf school and equipment rental integration
- Multi-language support (Spanish/English)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Mar del Plata surf community
- OpenStreetMap contributors
- Unsplash photographers for sample images
- shadcn/ui for beautiful components
- Vercel for hosting platform

## 📞 Contact

For questions, suggestions, or collaboration:
- Email: info@spoteado.com
- Instagram: @spoteado_mdp
- Join our [Discord community](https://discord.gg/spoteado)

---

**Made with 🌊 for the Mar del Plata surf community**