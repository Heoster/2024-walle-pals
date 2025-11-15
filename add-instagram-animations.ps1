# Add Instagram Animations to All Friend Pages
# This script adds animated Instagram buttons with personalized links to each friend page

Write-Host "=== Adding Instagram Animations to Friend Pages ===" -ForegroundColor Green

# Instagram accounts mapping
$instagramAccounts = @{
    'harsh' = 'codeex._.heoster'
    'parduman' = 'kittu_pandat001'
    'kartik' = 'kartik_bharadwaj72'
    'pankaj' = '__pankajthakur2'
    'lakshay' = '1__numbri__'
    'pasandu' = 'official_nawajish_295'
    'vishesh' = 'vishesh_soam_07'
    'sahil' = '_imkhansahil_'
    'tushar' = 'rjput_tushar.0007'
    'yougank' = 'kaju_rana_0001'
    'masum' = 'masummalik30'
    'shiv' = 'rajputana_shiv_'
    'pintu' = 'rajput._.boy_0001'
    'ayush' = 'thakur__ayush__soam'
    'shivaji' = 'shiva_ji_00'
    'sachin' = 'its_saini0002'
    'varun' = 'varunrajput6290'
    'hani' = 'its_honey_kashyap_ak47'
    'anshul' = 'anshulgujjar8776'
    'abhishek' = 'itx__abhishek_302'
    'arjun' = 'arjundhaka479'
    'dheraj' = 'dheeraj_som__2110'
    'rajat' = 'rajatchoudhary3496'
    'mudashir' = 'the.shaaan___'
    'ashish' = 'ashish__jayant'
    'rijwaan' = 'riwan.chaudhary'
}

# Friends without Instagram accounts - will get a generic message
$friendsWithoutInstagram = @('aditya', 'rudra', 'ravi', 'arijit')

# Function to create Instagram section HTML
function Get-InstagramSectionHTML {
    param(
        [string]$FriendName,
        [string]$InstagramHandle
    )
    
    if ($InstagramHandle) {
        return @"
    <!-- Instagram Button Section -->
    <section class="instagram-section">
        <div class="container">
            <h3>Connect with $FriendName</h3>
            <p>Follow on Instagram for amazing moments and updates</p>
            <a href="https://instagram.com/$InstagramHandle" target="_blank" rel="noopener noreferrer"
                class="instagram-button">
                <svg viewBox="0 0 16 16" class="bi bi-instagram" fill="currentColor" height="20" width="20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
                    </path>
                </svg>
                <span>@$InstagramHandle</span>
            </a>
        </div>
    </section>
"@
    } else {
        return @"
    <!-- Instagram Button Section -->
    <section class="instagram-section">
        <div class="container">
            <h3>Connect with $FriendName</h3>
            <p>Stay connected through our friend circle</p>
            <div class="instagram-button" style="background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); cursor: default;">
                <svg viewBox="0 0 16 16" fill="currentColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span>Friend Circle Member</span>
            </div>
        </div>
    </section>
"@
    }
}

# Get all friend HTML files
$friendFiles = Get-ChildItem "friends\*.html" -Exclude "template-advanced.html"
$updatedCount = 0
$errorCount = 0

Write-Host "Found $($friendFiles.Count) friend pages to update" -ForegroundColor Cyan

foreach ($file in $friendFiles) {
    try {
        $friendName = $file.BaseName
        $friendNameCapitalized = (Get-Culture).TextInfo.ToTitleCase($friendName.ToLower())
        
        Write-Host "Processing: $friendName..." -ForegroundColor Yellow
        
        # Read the file content
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Add animated Instagram CSS if not already present
        if ($content -notmatch 'instagram-animated\.css') {
            $content = $content -replace '(<link rel="stylesheet" href="\.\./css/instagram-button\.css">)', '$1`n    <link rel="stylesheet" href="../css/instagram-animated.css">'
        }
        
        # Get Instagram handle for this friend
        $instagramHandle = $instagramAccounts[$friendName]
        
        # Create Instagram section HTML
        $instagramSectionHTML = Get-InstagramSectionHTML -FriendName $friendNameCapitalized -InstagramHandle $instagramHandle
        
        # Remove existing Instagram section if present
        $content = $content -replace '(?s)<!-- Instagram Button Section -->.*?</section>', ''
        
        # Add new Instagram section before footer
        $content = $content -replace '(<footer class="footer">)', "$instagramSectionHTML`n    `$1"
        
        # Write back to file
        Set-Content $file.FullName -Value $content -Encoding UTF8
        
        if ($instagramHandle) {
            Write-Host "  ✅ Added Instagram link: @$instagramHandle" -ForegroundColor Green
        } else {
            Write-Host "  ✅ Added friend circle badge (no Instagram)" -ForegroundColor Cyan
        }
        
        $updatedCount++
        
    } catch {
        Write-Error "  ❌ Failed to update $($file.Name): $($_.Exception.Message)"
        $errorCount++
    }
}

Write-Host "`n=== Adding Animation JavaScript ===" -ForegroundColor Green

# Create JavaScript for Instagram animations
$instagramJS = @"
// Instagram Animation Controller
class InstagramAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupClickTracking();
    }

    setupScrollAnimations() {
        // Animate Instagram section when it comes into view
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation to button
                    const button = entry.target.querySelector('.instagram-button');
                    if (button) {
                        setTimeout(() => {
                            button.style.animation = 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both';
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe Instagram sections
        const instagramSections = document.querySelectorAll('.instagram-section');
        instagramSections.forEach(section => observer.observe(section));
    }

    setupHoverEffects() {
        const instagramButtons = document.querySelectorAll('.instagram-button');
        
        instagramButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                // Add floating hearts effect
                this.createFloatingHearts(button);
            });
        });
    }

    createFloatingHearts(button) {
        const hearts = ['💖', '📸', '🌟', '💫', '✨'];
        const buttonRect = button.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    left: \${buttonRect.left + Math.random() * buttonRect.width}px;
                    top: \${buttonRect.top}px;
                    font-size: 1.5rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: float-up 2s ease-out forwards;
                `;
                
                document.body.appendChild(heart);
                
                // Remove after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 2000);
            }, i * 200);
        }
    }

    setupClickTracking() {
        const instagramButtons = document.querySelectorAll('a.instagram-button');
        
        instagramButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
                
                // Optional: Track click for analytics
                const handle = button.querySelector('span').textContent;
                console.log(`Instagram link clicked: \${handle}`);
            });
        });
    }
}

// Add floating animation CSS
const floatingCSS = `
@keyframes float-up {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-100px) scale(1.5);
    }
}
`;

// Add CSS to document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatingCSS;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InstagramAnimations();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InstagramAnimations;
}
"@

# Write Instagram animation JavaScript
Set-Content "js\instagram-animations.js" -Value $instagramJS -Encoding UTF8
Write-Host "Created: js/instagram-animations.js" -ForegroundColor Green

# Add JavaScript to all friend pages
foreach ($file in $friendFiles) {
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Add Instagram animations JS if not already present
        if ($content -notmatch 'instagram-animations\.js') {
            $content = $content -replace '(<script src="\.\./js/friend-gallery-enhanced\.js"></script>)', '$1`n    <script src="../js/instagram-animations.js"></script>'
            Set-Content $file.FullName -Value $content -Encoding UTF8
        }
    } catch {
        Write-Warning "Failed to add JavaScript to: $($file.Name)"
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Green
Write-Host "Friend pages updated: $updatedCount" -ForegroundColor White
Write-Host "Errors: $errorCount" -ForegroundColor Red
Write-Host "Instagram accounts linked: $($instagramAccounts.Count)" -ForegroundColor White
Write-Host "Friends without Instagram: $($friendsWithoutInstagram.Count)" -ForegroundColor White

Write-Host "`n✅ Instagram animations added to all friend pages!" -ForegroundColor Green
Write-Host "Features added:" -ForegroundColor Cyan
Write-Host "- Animated Instagram buttons with gradient backgrounds" -ForegroundColor White
Write-Host "- Personalized links to each friend's Instagram account" -ForegroundColor White
Write-Host "- Floating hearts animation on hover" -ForegroundColor White
Write-Host "- Scroll-triggered animations" -ForegroundColor White
Write-Host "- Responsive design for all devices" -ForegroundColor White
Write-Host "- Friend circle badges for friends without Instagram" -ForegroundColor White