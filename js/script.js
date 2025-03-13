// Add smooth scroll behavior to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Share functionality
document.addEventListener('DOMContentLoaded', () => {

    const shareOverlay = document.getElementById('shareOverlay');
    const closeBtn = shareOverlay.querySelector('.close-btn');
    const shareDotsBtns = document.querySelectorAll('.share-dots-btn');
    const sharePreviewContent = shareOverlay.querySelector('.share-preview-content');
    const copyLinkBtn = document.getElementById('copyLink');
    let currentCardUrl = '';

    // Function to show share overlay with animation
    function showShareOverlay(cardElement) {
        let cardTitle, cardLink;
        
        if (cardElement.classList.contains('profile-share-btn')) {
            cardTitle = 'Gagan Visuals';
            cardLink = window.location.href;
        } else if (cardElement.classList.contains('link-card')) {
            // Remove the share dots button text from the title
            cardTitle = cardElement.querySelector('h3').textContent.replace(/Share$/, '').trim();
            cardLink = cardElement.querySelector('.card-link').href;
        } else {
            // For other elements
            cardTitle = cardElement.querySelector('h3')?.textContent.trim() || 'Gagan Visuals';
            cardLink = cardElement.querySelector('.card-link')?.href || window.location.href;
        }
        
        currentCardUrl = cardLink;

        // Update share preview content
        const previewContent = shareOverlay.querySelector('.share-preview-content');
        const previewImage = previewContent.querySelector('.share-preview-image');
        const previewHeader = previewContent.querySelector('.share-preview-header');
        const previewTitle = previewContent.querySelector('.share-preview-title');
        const previewUrl = previewContent.querySelector('.share-url');

        // Set title and URL
        previewTitle.textContent = cardTitle;
        previewUrl.textContent = currentCardUrl;

        // Handle image display
        if (cardElement.classList.contains('profile-share-btn')) {
            previewImage.src = 'assets/profile.jpg';
            previewHeader.style.display = 'block';
        } else if (cardElement.querySelector('.card-image')) {
            previewImage.src = cardElement.querySelector('.card-image').src;
            previewHeader.style.display = 'block';
        } else {
            previewHeader.style.display = 'none';
        }

        // Show overlay
        shareOverlay.style.display = 'flex';
        requestAnimationFrame(() => {
            shareOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Add click event listeners to share dots buttons
    shareDotsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.link-card');
            showShareOverlay(card);
        });
    });

    // Function to hide overlay with animation
    function hideShareOverlay() {
        shareOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            shareOverlay.style.display = 'none';
        }, 300); // Match the CSS transition duration
    }

    // Close overlay when clicking close button or outside
    closeBtn.addEventListener('click', hideShareOverlay);

    shareOverlay.addEventListener('click', (e) => {
        if (e.target === shareOverlay) {
            hideShareOverlay();
        }
    });

    // Copy link functionality
    copyLinkBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(currentCardUrl);
            const span = copyLinkBtn.querySelector('span');
            const originalText = span.textContent;
            span.textContent = 'Copied!';
            setTimeout(() => {
                span.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    });

    // Social media share handlers
    document.getElementById('shareX').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentCardUrl)}`, '_blank');
    });

    document.getElementById('shareFacebook').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentCardUrl)}`, '_blank');
    });

    document.getElementById('shareWhatsApp').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://wa.me/?text=${encodeURIComponent(currentCardUrl)}`, '_blank');
    });

    document.getElementById('shareLinkedIn').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentCardUrl)}`, '_blank');
    });
    
    // Add handlers for Messenger and Snap share options
    document.getElementById('shareMessenger').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://www.messenger.com/login.php?url=${encodeURIComponent(currentCardUrl)}`, '_blank');
    });
    
    document.getElementById('shareSnap').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(currentCardUrl)}`, '_blank');
    });

    document.getElementById('shareEmail').addEventListener('click', function(e) {
        e.preventDefault();
        const title = document.querySelector('.share-preview-title').textContent;
        const url = document.querySelector('.share-url').textContent;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        window.open(mailtoLink);
    });

    document.getElementById('shareMore').addEventListener('click', function(e) {
        e.preventDefault();
        const url = document.querySelector('.share-url').textContent;
        if (navigator.share) {
            navigator.share({
                title: document.querySelector('.share-preview-title').textContent,
                url: url
            }).catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copied to clipboard!');
        }
    });

    // Share dots button click handler
    shareDotsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.link-card');
            const previewHeader = document.querySelector('.share-preview-header');
            const previewImage = document.querySelector('.share-preview-image');
            const previewTitle = document.querySelector('.share-preview-title');
            
            if (card) {
                // For link cards
                const title = card.querySelector('h3').textContent.trim();
                const url = card.querySelector('.card-link').href;
                const hasImage = card.querySelector('.card-image');
                currentCardUrl = url;
                
                previewTitle.textContent = title;
                document.querySelector('.share-url').textContent = url;
                
                if (hasImage) {
                    previewImage.src = `assets/${card.getAttribute('data-image')}-bg.jpg`;
                    previewImage.style.display = 'block';
                    previewHeader.style.display = 'flex';
                } else {
                    previewImage.style.display = 'none';
                    previewHeader.style.display = 'block'; // Keep header to show title
                    previewTitle.style.marginLeft = '0'; // Center the title when no image
                }
            } else {
                // For profile share button
                const url = window.location.href;
                currentCardUrl = url;
                previewTitle.textContent = 'Gagan Visuals';
                document.querySelector('.share-url').textContent = url;
                previewImage.src = 'assets/profile.jpg';
                previewImage.style.display = 'block';
                previewHeader.style.display = 'flex';
                previewTitle.style.marginLeft = ''; // Reset margin
            }
            
            // Show overlay
            shareOverlay.style.display = 'flex';
            requestAnimationFrame(() => {
                shareOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    });

    // Add click event to link cards
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking share button
            if (!e.target.closest('.share-dots-btn')) {
                const link = card.querySelector('.card-link').href;
                window.open(link, '_blank');
            }
        });
    });

    const sharePreviewImage = document.querySelector('.share-preview-image');
    const sharePreviewTitle = document.querySelector('.share-preview-title');
    const shareUrl = document.querySelector('.share-url');
    
    // Update profile share button handler
    const profileShareBtn = document.querySelector('.profile-share-btn');
    if (profileShareBtn) {
        profileShareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showShareOverlay(profileShareBtn);
        });
    }
});

// Calendar functionality
class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.selectedTimeSlot = null;
        this.calendarGrid = document.querySelector('.calendar-grid');
        this.timeSlots = document.querySelectorAll('.time-slot');
        this.timezoneSelect = document.getElementById('timezone');
        this.selectedDateElement = document.querySelector('.selected-date span');
        this.selectedTimeElement = document.querySelector('.selected-time span');
        this.confirmButton = document.getElementById('confirmBooking');

        this.initializeCalendar();
        this.initializeTimeSlots();
        this.initializeTimezone();
        this.initializeConfirmButton();
    }

    initializeCalendar() {
        this.renderCalendar();
    }

    renderCalendar() {
        if (!this.calendarGrid) return;

        this.calendarGrid.innerHTML = '';
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Add day headers
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            this.calendarGrid.appendChild(dayHeader);
        });

        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            this.calendarGrid.appendChild(emptyCell);
        }

        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;

            const currentDate = new Date();
            const cellDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);

            // Disable past dates
            if (cellDate < new Date(currentDate.setHours(0,0,0,0))) {
                dayCell.classList.add('disabled');
            } else {
                dayCell.addEventListener('click', () => this.selectDate(cellDate));
            }

            this.calendarGrid.appendChild(dayCell);
        }
    }

    selectDate(date) {
        this.selectedDate = date;
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
        });

        const selectedDay = Array.from(document.querySelectorAll('.calendar-day')).find(
            day => !day.classList.contains('empty') && parseInt(day.textContent) === date.getDate()
        );

        if (selectedDay) {
            selectedDay.classList.add('selected');
        }

        this.updateSelectedInfo();
    }

    initializeTimeSlots() {
        this.timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                this.timeSlots.forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                this.selectedTimeSlot = slot.textContent;
                this.updateSelectedInfo();
            });
        });
    }

    initializeTimezone() {
        if (this.timezoneSelect) {
            this.timezoneSelect.addEventListener('change', () => this.updateSelectedInfo());
        }
    }

    updateSelectedInfo() {
        if (this.selectedDate) {
            this.selectedDateElement.textContent = this.selectedDate.toLocaleDateString();
        }

        if (this.selectedTimeSlot) {
            this.selectedTimeElement.textContent = `${this.selectedTimeSlot} ${this.timezoneSelect.value}`;
        }

        // Enable/disable confirm button based on selection
        if (this.confirmButton) {
            this.confirmButton.style.opacity = (this.selectedDate && this.selectedTimeSlot) ? '1' : '0.5';
            this.confirmButton.style.pointerEvents = (this.selectedDate && this.selectedTimeSlot) ? 'auto' : 'none';
        }
    }

    initializeConfirmButton() {
        if (this.confirmButton) {
            this.confirmButton.addEventListener('click', () => {
                const userEmail = document.getElementById('userEmail');
                
                if (!userEmail.value) {
                    alert('Please enter your email address');
                    return;
                }

                if (!userEmail.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    alert('Please enter a valid email address');
                    return;
                }

                if (this.selectedDate && this.selectedTimeSlot) {
                    const date = this.selectedDate.toLocaleDateString();
                    const time = this.selectedTimeSlot;
                    const timezone = this.timezoneSelect.value;
                    const subject = "Meeting Request with Gagan Visuals";
                    const body = `Meeting Request Details:

From: ${userEmail.value}
Date: ${date}
Time: ${time} ${timezone}

Looking forward to our meeting!`;
                    
                    const mailtoLink = `mailto:mrgaganok@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.location.href = mailtoLink;
                }
            });
        }
    }
}

// Initialize calendar when the page loads
window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.calendar-grid')) {
        new Calendar();
    }
});

// Add animation to social links
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.1)';
        link.style.transition = 'transform 0.2s ease';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)';
    });
});

// Add hover effect to meeting cards
const meetingCards = document.querySelectorAll('.meeting-card');
meetingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});