import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
      searchQuery: string = '';
    value1 = this.searchQuery
    title = 'NLPaSoftFrontEnd';
        countdown = 0;
  countdownDone = false;
  interval: any;
  countdownStarted = false;
  // Adjustable image style
  imageTop = '100px';
  imageLeft = '150px';
  imageWidth = '200px';
  imageHeight = '200px';

  onSearch(): void {
    console.log('Search query:', this.searchQuery);
  }

      onSearchClick2(): void {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = ''; // Clear previous content
  console.log("It triggered");
  console.log(this.searchQuery);

  // Example input data
  const inputTest2 = {
    comments: [
      "The Now You See Me franchise is a huge guilty pleasure for me. What can I say? It's fun.",
      "so happy that Zach cregger is still in his weird horror era, never wouldve seen that coming watching WKUK back in the day",
      "That looks amazing! I can't wait for the new Now You See Me movie..!",
      "Swaim is so brave.",
      "So you'd think if they were saving the \"Now You Don't\", they'd have used it in a movie where thematically, everyone would be disappearing at the end, like leaving the franchise. But instead, this movie is all about how everyone left in the last movie, and they are now all coming back. So like, they fucked up the title on so many levels, it's impressive how bad this movie is from a marketing standpoint.",
      "Wonder how Dan Harmon feels about this?",
      "I promise to obey the title and not see that movie"
    ],
    SpamNot: ["Spam", "Not Spam", "Spam", "Spam", "Not", "Spam", "Not"]
  };

  // Create main container
  // const mainBox = document.createElement('div');
  // mainBox.style.width = '800px';
  // mainBox.style.margin = '50px auto';
  // mainBox.style.backgroundColor = '#f9f9f9';
  // mainBox.style.borderRadius = '16px';
  // mainBox.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
  // mainBox.style.padding = '20px';
  // mainBox.style.display = 'flex';
  // mainBox.style.flexDirection = 'column';
  // mainBox.style.gap = '12px';
  // mainBox.style.maxHeight = '600px';
  // mainBox.style.overflowY = 'auto';

  const mainBox = document.createElement('div');
mainBox.style.position = 'absolute'; // or 'fixed' if you want it to stay while scrolling
mainBox.style.top = '100px';         // adjust as needed
mainBox.style.left = '30px';        // adjust as needed
mainBox.style.width = '1450px';       // new width
mainBox.style.height = '900px';      // new height
mainBox.style.backgroundColor = '#f9f9f9';
mainBox.style.borderRadius = '16px';
mainBox.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
mainBox.style.padding = '20px';
mainBox.style.display = 'flex';
mainBox.style.flexDirection = 'column';
mainBox.style.gap = '12px';
mainBox.style.overflowY = 'auto'; // make it scroll if content overflows


      const headerBox = document.createElement('div');
      headerBox.textContent = this.value1;
      headerBox.style.padding = '20px';
      headerBox.style.backgroundColor = '#333';
      headerBox.style.color = 'white';
      headerBox.style.fontSize = '20px';
      headerBox.style.fontWeight = 'bold';
      headerBox.style.textAlign = 'center';
         mainBox.appendChild(headerBox);

  inputTest2.comments.forEach((comment, index) => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.gap = '10px';
    wrapper.style.alignItems = 'flex-start';

    // Comment box
    const commentBox = document.createElement('div');
    commentBox.textContent = comment;
    commentBox.style.width = '1270px';
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

    // Spam/Not Spam box
    const labelBox = document.createElement('div');
    labelBox.textContent = inputTest2.SpamNot[index];
    labelBox.style.minWidth = '100px';
    labelBox.style.textAlign = 'center';
    labelBox.style.padding = '12px';
    labelBox.style.backgroundColor = '#eee';
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

  // Modal setup (append once)
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
}

  startCountdownAndShowImage(): void {
    if (this.countdownStarted) return; // prevent double start
    this.countdownStarted = true;
    this.countdownDone = false;
    this.countdown = 5;

    // Create floating image div
    // const floatingDiv = document.createElement('div');
    // floatingDiv.id = 'floating-image';
    // floatingDiv.style.position = 'absolute';
    // floatingDiv.style.top = this.imageTop;
    // floatingDiv.style.left = this.imageLeft;
    // floatingDiv.style.width = this.imageWidth;
    // floatingDiv.style.height = this.imageHeight;
    // floatingDiv.style.zIndex = '9999';

    // const img = document.createElement('img');
    // img.src = 'assets/angular.png'; // make sure this file exists in src/assets
    // img.alt = 'Floating Image';
    // img.style.width = '100%';
    // img.style.height = '100%';
    // img.style.objectFit = 'contain';

    // floatingDiv.appendChild(img);
    // document.body.appendChild(floatingDiv);

    // Start countdown timer
    this.interval = setInterval(() => {
      console.log('Time left:', this.countdown);
      this.countdown--;

      if (this.countdown < 0) {
        clearInterval(this.interval);
        this.countdownDone = true;
        this.countdownStarted = false;

        // Remove floating image
        const imgDiv = document.getElementById('floating-image');
        if (imgDiv) {
          document.body.removeChild(imgDiv);
        }

        // Append comments content after countdown
        this.onSearchClick2();
      }
    }, 1000);
  }



}
