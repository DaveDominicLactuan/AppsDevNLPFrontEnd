
startCountdownFetchAndDisplay(): void {
  if (this.countdownStarted) return;

  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = ''; // Clear previous content

  this.countdownStarted = true;
  this.countdownDone = false;
  this.countdown = 5;
  this.loading = false;
  this.error = '';
  this.comments = [];

  // Countdown display
  const countdownDiv = document.createElement('div');
  countdownDiv.style.fontSize = '40px';
  countdownDiv.style.color = '#fff';
  countdownDiv.style.textAlign = 'center';
  countdownDiv.style.marginTop = '40px';
  content.appendChild(countdownDiv);

  // Floating image stays until data loads
  const img = document.createElement('img');
  img.src = 'assets/angular.png';
  img.alt = 'Angular Logo';
  img.className = 'resized-img';
  img.style.display = 'block';
  img.style.margin = '20px auto';
  img.style.height = '700px';
  img.style.width = '700px';
  content.appendChild(img);

  // Countdown logic
  this.interval = setInterval(() => {
    countdownDiv.innerText = `${this.countdown}s`;
    this.countdown--;

    if (this.countdown < 0) {
      clearInterval(this.interval);
      this.countdownStarted = false;
      this.countdownDone = true;

      this.loading = true;

      this.youtubeService.scrapeComments(this.videoUrl).subscribe({
        next: (response) => {
          console.log('YouTube Comments Response:', response); // ✅ Console log

          this.comments = response.comments || [];
const labels = response.SpamNot || [];

// ✅ Remove countdown and image
countdownDiv.remove();
if (img && img.parentElement) {
  img.parentElement.removeChild(img); // ← This removes the image properly
}
          const mainBox = document.createElement('div');
          mainBox.style.width = '800px';
          mainBox.style.margin = '50px auto';
          mainBox.style.backgroundColor = '#f9f9f9';
          mainBox.style.borderRadius = '16px';
          mainBox.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
          mainBox.style.padding = '20px';
          mainBox.style.display = 'flex';
          mainBox.style.flexDirection = 'column';
          mainBox.style.gap = '12px';
          mainBox.style.maxHeight = '600px';
          mainBox.style.overflowY = 'auto';

          const headerBox = document.createElement('div');
          headerBox.textContent = this.value1 || 'Comments Result';
          headerBox.style.padding = '20px';
          headerBox.style.backgroundColor = '#333';
          headerBox.style.color = 'white';
          headerBox.style.fontSize = '20px';
          headerBox.style.fontWeight = 'bold';
          headerBox.style.textAlign = 'center';
          mainBox.appendChild(headerBox);

          this.comments.forEach((comment: string, index: number) => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.gap = '10px';
            wrapper.style.alignItems = 'flex-start';

            // Comment Box
            const commentBox = document.createElement('div');
            commentBox.textContent = comment;
            commentBox.style.width = '550px';
            commentBox.style.height = '80px';
            commentBox.style.overflow = 'hidden';
            commentBox.style.textOverflow = 'ellipsis';
            commentBox.style.whiteSpace = 'nowrap';
            commentBox.style.padding = '12px';
            commentBox.style.backgroundColor = 'white';
            commentBox.style.borderRadius = '8px';
            commentBox.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
            commentBox.style.cursor = 'pointer';
            commentBox.title = 'Click to view full comment';
            commentBox.onclick = () => showPopup(comment);

            // Label Box (Spam/Not Spam/Undefined)
            const labelBox = document.createElement('div');
            const labelText = labels[index] || 'Undefined';
            labelBox.textContent = labelText;
            labelBox.style.minWidth = '100px';
            labelBox.style.textAlign = 'center';
            labelBox.style.padding = '12px';
            labelBox.style.backgroundColor = labelText === 'Spam' ? '#ffcccc' : (labelText === 'Not Spam' ? '#ccffcc' : '#f0f0f0');
            labelBox.style.borderRadius = '8px';
            labelBox.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
            labelBox.style.fontWeight = 'bold';

            wrapper.appendChild(commentBox);
            wrapper.appendChild(labelBox);
            mainBox.appendChild(wrapper);
          });

          content.appendChild(mainBox);

          // Background image
          document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080')";
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
          document.body.style.backgroundRepeat = 'no-repeat';

          // Modal setup
          let modal = document.getElementById('comment-modal') as HTMLDivElement;
          if (!modal) {
            modal = document.createElement('div');
            modal.id = 'comment-modal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100vw';
            modal.style.height = '100vh';
            modal.style.background = 'rgba(0, 0, 0, 0.6)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '9999';
            modal.style.visibility = 'hidden';

            const modalContent = document.createElement('div');
            modalContent.id = 'modal-content';
            modalContent.style.background = 'white';
            modalContent.style.padding = '20px';
            modalContent.style.borderRadius = '10px';
            modalContent.style.maxWidth = '600px';
            modalContent.style.maxHeight = '80vh';
            modalContent.style.overflowY = 'auto';
            modalContent.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
            modal.appendChild(modalContent);

            modal.onclick = () => {
              modal.style.visibility = 'hidden';
            };

            document.body.appendChild(modal);
          }

          function showPopup(text: string): void {
            const modal = document.getElementById('comment-modal')!;
            const modalContent = document.getElementById('modal-content')!;
            modalContent.textContent = text;
            modal.style.visibility = 'visible';
          }
        },
        error: (err) => {
          this.error = err.error?.error || 'An error occurred';
          this.loading = false;
          content.innerHTML = `<div style="color:red; text-align:center;">${this.error}</div>`;
        }
      });
    }
  }, 1000);
}

