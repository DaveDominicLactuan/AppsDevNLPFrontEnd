  startCountdownAndFetchComments(): void {
  if (this.countdownStarted) return; // prevent multiple triggers

  this.countdownStarted = true;
  this.countdownDone = false;
  this.countdown = 5;
  this.loading = false;
  this.error = '';
  this.comments = [];

  // Start countdown timer
  this.interval = setInterval(() => {
    console.log('Time left:', this.countdown);
    this.countdown--;

    if (this.countdown < 0) {
      clearInterval(this.interval);
      this.countdownDone = true;
      this.countdownStarted = false;

      // Fetch comments after countdown
      this.loading = true;
      this.youtubeService.scrapeComments(this.videoUrl).subscribe({
        next: (response) => {
          this.comments = response.comments;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.error || 'An error occurred';
          this.loading = false;
        }
      });
    }
  }, 1000);
}

startCountdownFetchAndDisplay(): void {
  if (this.countdownStarted) return;

  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = ''; // Clear previous content in container

  this.countdownStarted = true;
  this.countdownDone = false;
  this.countdown = 5;
  this.loading = false;
  this.error = '';
  this.comments = [];

  // Countdown Display Element
  const countdownDiv = document.createElement('div');
  countdownDiv.style.fontSize = '40px';
  countdownDiv.style.color = '#fff';
  countdownDiv.style.textAlign = 'center';
  countdownDiv.style.marginTop = '40px';
  // countdownDiv.innerText = `${this.countdown}s`;
  content.appendChild(countdownDiv);

  // Floating Image
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
    this.countdown--;
    // countdownDiv.innerText = `${this.countdown}s`;

    if (this.countdown < 0) {
      clearInterval(this.interval);
      this.countdownStarted = false;
      this.countdownDone = true;

      // Remove countdown and image
      content.innerHTML = '';

      this.loading = true;

      this.youtubeService.scrapeComments(this.videoUrl).subscribe({
        next: (response) => {
          this.loading = false;
          this.comments = response.comments;

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

            wrapper.appendChild(commentBox);
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
