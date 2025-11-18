// Friendship Quotes Carousel

class FriendshipQuotes {
  constructor() {
    this.quotes = [
      {
        text: "A real friend is one who walks in when the rest of the world walks out.",
        author: "Walter Winchell"
      },
      {
        text: "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'",
        author: "C.S. Lewis"
      },
      {
        text: "True friendship comes when the silence between two people is comfortable.",
        author: "David Tyson"
      },
      {
        text: "A friend is someone who knows all about you and still loves you.",
        author: "Elbert Hubbard"
      },
      {
        text: "Friendship is the only cement that will ever hold the world together.",
        author: "Woodrow Wilson"
      },
      {
        text: "The greatest gift of life is friendship, and I have received it.",
        author: "Hubert H. Humphrey"
      },
      {
        text: "Friends are the family we choose for ourselves.",
        author: "Edna Buchanan"
      },
      {
        text: "A true friend never gets in your way unless you happen to be going down.",
        author: "Arnold H. Glasow"
      },
      {
        text: "Friendship is not about whom you have known the longest. It's about who came and never left your side.",
        author: "Unknown"
      },
      {
        text: "In the cookie of life, friends are the chocolate chips.",
        author: "Salman Rushdie"
      },
      {
        text: "A friend is one that knows you as you are, understands where you have been, accepts what you have become, and still gently allows you to grow.",
        author: "William Shakespeare"
      },
      {
        text: "Friendship marks a life even more deeply than love. Love risks degenerating into obsession, friendship is never anything but sharing.",
        author: "Elie Wiesel"
      }
    ];

    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    try {
      this.container = document.querySelector('.quotes-carousel');
      if (!this.container) return;

      this.renderQuotes();
      this.setupNavigation();
      this.startAutoPlay();
    } catch (error) {
      console.error('Error setting up friendship quotes:', error);
    }
  }

  renderQuotes() {
    const quotesHTML = this.quotes.map((quote, index) => `
      <div class="quote-card ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="quote-decoration">"</div>
        <div class="quote-decoration right">"</div>
        <div class="quote-icon">💭</div>
        <p class="quote-text">"${quote.text}"</p>
        <p class="quote-author">— ${quote.author}</p>
      </div>
    `).join('');

    this.container.innerHTML = quotesHTML;
  }

  setupNavigation() {
    const navigation = document.querySelector('.quotes-navigation');
    if (!navigation) return;

    // Previous button
    const prevBtn = navigation.querySelector('.quote-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousQuote());
    }

    // Next button
    const nextBtn = navigation.querySelector('.quote-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextQuote());
    }

    // Dots
    const dots = navigation.querySelectorAll('.quote-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToQuote(index));
    });

    // Random button
    const randomBtn = document.querySelector('.random-quote-btn');
    if (randomBtn) {
      randomBtn.addEventListener('click', () => this.randomQuote());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousQuote();
      } else if (e.key === 'ArrowRight') {
        this.nextQuote();
      }
    });
  }

  showQuote(index) {
    const cards = document.querySelectorAll('.quote-card');
    const dots = document.querySelectorAll('.quote-dot');

    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    this.currentIndex = index;
  }

  nextQuote() {
    const nextIndex = (this.currentIndex + 1) % this.quotes.length;
    this.showQuote(nextIndex);
    this.resetAutoPlay();
  }

  previousQuote() {
    const prevIndex = (this.currentIndex - 1 + this.quotes.length) % this.quotes.length;
    this.showQuote(prevIndex);
    this.resetAutoPlay();
  }

  goToQuote(index) {
    this.showQuote(index);
    this.resetAutoPlay();
  }

  randomQuote() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.quotes.length);
    } while (randomIndex === this.currentIndex && this.quotes.length > 1);
    
    this.showQuote(randomIndex);
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextQuote();
    }, 8000); // Change quote every 8 seconds
  }

  resetAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.startAutoPlay();
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize quotes
let friendshipQuotes;
try {
  friendshipQuotes = new FriendshipQuotes();
} catch (error) {
  console.error('Failed to initialize friendship quotes:', error);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FriendshipQuotes;
}
