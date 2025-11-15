// Instagram Animations Integration Script
// This script integrates Instagram animations into the main 2024 Walle Pals website

class InstagramIntegration {
    constructor() {
        this.friendsData = null;
        this.init();
    }

    async init() {
        await this.loadFriendsData();
        this.injectInstagramSections();
        this.initializeAnimations();
    }

    async loadFriendsData() {
        try {
            const response = await fetch('data/friends-instagram.json');
            this.friendsData = await response.json();
            console.log('✅ Friends Instagram data loaded');
        } catch (error) {
            console.warn('⚠️ Could not load Instagram data, using fallback');
            this.friendsData = this.getFallbackData();
        }
    }

    getFallbackData() {
        return {
            friends: [
                {
                    name: "Harsh",
                    instagram: "codeex._.heoster",
                    description: "Follow for amazing coding moments and updates"
                },
                {
                    name: "Kartik",
                    instagram: null,
                    description: "Stay connected through our friend circle"
                },
                {
                    name: "Pankaj",
                    instagram: null,
                    description: "Friend circle member"
                }
            ]
        };
    }

    injectInstagramSections() {
        // Find friend profile pages or sections
        const friendSections = document.querySelectorAll('.friend-profile, .friend-card, [data-friend]');
        
        friendSections.forEach(section => {
            const friendName = this.extractFriendName(section);
            const friendData = this.findFriendData(friendName);
            
            if (friendData) {
                this.addInstagramSection(section, friendData);
            }
        });

        // Add to main pages if no friend sections found
        if (friendSections.length === 0) {
            this.addToMainPages();
        }
    }

    extractFriendName(section) {
        // Try multiple ways to extract friend name
        const nameElement = section.querySelector('h1, h2, h3, .friend-name, [data-name]');
        if (nameElement) {
            return nameElement.textContent.trim();
        }
        
        const dataFriend = section.getAttribute('data-friend');
        if (dataFriend) {
            return dataFriend;
        }
        
        // Extract from URL or page title
        const urlPath = window.location.pathname;
        const match = urlPath.match(/friends\/(\w+)/);
        if (match) {
            return match[1].charAt(0).toUpperCase() + match[1].slice(1);
        }
        
        return null;
    }

    findFriendData(friendName) {
        if (!this.friendsData || !friendName) return null;
        
        return this.friendsData.friends.find(friend => 
            friend.name.toLowerCase() === friendName.toLowerCase()
        );
    }

    addInstagramSection(parentElement, friendData) {
        const instagramSection = this.createInstagramSection(friendData);
        
        // Find the best place to insert
        const insertPoint = parentElement.querySelector('.friend-details, .friend-info') || parentElement;
        insertPoint.appendChild(instagramSection);
    }

    createInstagramSection(friendData) {
        const section = document.createElement('section');
        section.className = 'instagram-section';
        
        const hasInstagram = friendData.instagram;
        
        section.innerHTML = `
            <div class="container">
                <h3>Connect with ${friendData.name}</h3>
                <p>${friendData.description}</p>
                ${hasInstagram ? this.createInstagramButton(friendData) : this.createFriendCircleBadge(friendData)}
            </div>
        `;
        
        return section;
    }

    createInstagramButton(friendData) {
        return `
            <a href="https://instagram.com/${friendData.instagram}" target="_blank" rel="noopener noreferrer"
                class="instagram-button">
                <svg viewBox="0 0 16 16" class="bi bi-instagram" fill="currentColor" height="20" width="20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
                <span>@${friendData.instagram}</span>
            </a>
        `;
    }

    createFriendCircleBadge(friendData) {
        return `
            <div class="instagram-button" style="background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); cursor: default;">
                <svg viewBox="0 0 16 16" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span>Friend Circle Member</span>
            </div>
        `;
    }

    addToMainPages() {
        // Add Instagram sections to main pages like index.html, friends.html
        const mainContent = document.querySelector('main, .main-content, .container');
        if (mainContent && this.friendsData) {
            const instagramContainer = document.createElement('div');
            instagramContainer.className = 'instagram-showcase';
            instagramContainer.innerHTML = '<h2>Connect with Our Friends</h2>';
            
            this.friendsData.friends.slice(0, 3).forEach(friend => {
                const section = this.createInstagramSection(friend);
                instagramContainer.appendChild(section);
            });
            
            mainContent.appendChild(instagramContainer);
        }
    }

    initializeAnimations() {
        // Initialize the Instagram animations
        if (typeof InstagramAnimations !== 'undefined') {
            new InstagramAnimations();
        } else {
            // Load the animations script if not already loaded
            this.loadAnimationsScript();
        }
    }

    loadAnimationsScript() {
        const script = document.createElement('script');
        script.src = 'js/instagram-animations.js';
        script.onload = () => {
            console.log('✅ Instagram animations loaded');
            if (typeof InstagramAnimations !== 'undefined') {
                new InstagramAnimations();
            }
        };
        document.head.appendChild(script);
    }

    // Method to manually trigger animations
    triggerAnimations() {
        const sections = document.querySelectorAll('.instagram-section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('animate-in');
            }, index * 200);
        });
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.instagramIntegration = new InstagramIntegration();
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InstagramIntegration;
}