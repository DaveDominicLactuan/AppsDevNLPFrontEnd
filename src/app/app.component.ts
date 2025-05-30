import { Component } from '@angular/core';
import { YoutubeService } from './youtube.service';
import {
 ApexAxisChartSeries,
 ApexChart,
 ApexXAxis,
 ApexTitleSubtitle,
 ApexDataLabels,
 ApexPlotOptions,
 ApexNonAxisChartSeries
} from 'ng-apexcharts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
 title = 'NLPaSoftFrontEnd';
  value1: string = 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ';
    countdown = 0;
  countdownDone = false;
  interval: any;
  countdownStarted = false;
  // Adjustable image style
  imageTop = '100px';
  imageLeft = '150px';
  imageWidth = '200px';
  imageHeight = '200px';
  searchQuery: string = '';

  videoUrl: string = '';
  comments: string[] = [];
  loading = false;
  error = '';

  showSearchUI = true;

  chartVisible = false;

// spamData: ApexNonAxisChartSeries = [];
// spamChartOptions: Partial<ApexCharts.ApexOptions> = {};

// toxicityData: ApexAxisChartSeries = [];
// toxicityChartOptions: Partial<ApexCharts.ApexOptions> = {};
  // showCharts: any;

  showCharts = false;

spamData: ApexNonAxisChartSeries = [];
toxicityData: ApexAxisChartSeries = [];

spamChartOptions: {
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
} = {
  chart: { type: 'pie' },
  labels: [],
  title: { text: '' }
};

toxicityChartOptions: {
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
} = {
  chart: { type: 'bar' },
  xaxis: { categories: [] },
  title: { text: '' }
};


resetUI(): void {
  this.showSearchUI = false;
}

handleSearch(): void {
  this.startCountdownFetchAndDisplay();
}

    constructor(private youtubeService: YoutubeService) {}
  

 inputTest: { comments: string[] } = {
  comments: [
    "The Now You See Me franchise is a huge guilty pleasure for me. What can I say? It's fun.",
    "so happy that Zach cregger is still in his weird horror era, never wouldve seen that coming watching WKUK back in the day",
    "That looks amazing! I can't wait for the new Now You See Me movie..!",
    "Swaim is so brave.",
    "So you'd think if they were saving the \"Now You Don't\", they'd have used it in a movie where thematically, everyone would be disappearing at the end, like leaving the franchise. But instead, this movie is all about how everyone left in the last movie, and they are now all coming back. So like, they fucked up the title on so many levels, it's impressive how bad this movie is from a marketing standpoint.",
    "Wonder how Dan Harmon feels about this?",
    "I promise to obey the title and not see that movie"
  ]
};

inputTest2: { comments: string[], SpamNot: string[] } = {
  comments: [
    "The Now You See Me franchise is a huge guilty pleasure for me. What can I say? It's fun.",
    "so happy that Zach cregger is still in his weird horror era, never wouldve seen that coming watching WKUK back in the day",
    "That looks amazing! I can't wait for the new Now You See Me movie..!",
    "Swaim is so brave.",
    "So you'd think if they were saving the \"Now You Don't\", they'd have used it in a movie where thematically, everyone would be disappearing at the end, like leaving the franchise. But instead, this movie is all about how everyone left in the last movie, and they are now all coming back. So like, they fucked up the title on so many levels, it's impressive how bad this movie is from a marketing standpoint.",
    "Wonder how Dan Harmon feels about this?",
    "I promise to obey the title and not see that movie"
  ], SpamNot: [
    "Spam",
    "Not Spam",
    "Spam",
    "Spam",
    "Not",
    "Spam",
    "Not"
  ], 
};


// onSearchClick(): void {
//     const content = document.getElementById('main-content');
//     if (content) {
//       content.innerHTML = ''; // Clear the container's contents

//       const inputTest = {
//         comments: [
//           "The Now You See Me franchise is a huge guilty pleasure for me. What can I say? It's fun.",
//           "so happy that Zach cregger is still in his weird horror era, never wouldve seen that coming watching WKUK back in the day",
//           "That looks amazing! I can't wait for the new Now You See Me movie..!",
//           "Swaim is so brave.",
//           "So you'd think if they were saving the \"Now You Don't\", they'd have used it in a movie where thematically, everyone would be disappearing at the end, like leaving the franchise. But instead, this movie is all about how everyone left in the last movie, and they are now all coming back. So like, they fucked up the title on so many levels, it's impressive how bad this movie is from a marketing standpoint.",
//           "Wonder how Dan Harmon feels about this?",
//           "I promise to obey the title and not see that movie"
//         ]
//       };

//       // Extract quoted strings
//       const extractQuotedStrings = (comments: string[]): string[] => {
//         const result: string[] = [];
//         const quoteRegex = /"([^"]+)"/g;
//         for (const comment of comments) {
//           let match: RegExpExecArray | null;
//           while ((match = quoteRegex.exec(comment)) !== null) {
//             result.push(match[1]);
//           }
//         }
//         return result;
//       };

//       const extractedStrings = extractQuotedStrings(inputTest.comments);

//       // Wrapper for all boxes
//       const wrapper = document.createElement('div');
//       wrapper.style.display = 'flex';
//       wrapper.style.flexDirection = 'column';
//       wrapper.style.alignItems = 'center';
//       wrapper.style.gap = '20px';
//       wrapper.style.marginTop = '50px';

//       // Box for value1
//       const valueBox = document.createElement('div');
//       valueBox.textContent = this.value1;
//       styleBox(valueBox);
//       wrapper.appendChild(valueBox);

//       // Boxes for each quoted string
//       extractedStrings.forEach(str => {
//         const box = document.createElement('div');
//         box.textContent = str;
//         styleBox(box);
//         wrapper.appendChild(box);
//       });

//       // If no strings found
//       if (extractedStrings.length === 0) {
//         const box = document.createElement('div');
//         box.textContent = 'No quoted strings found.';
//         styleBox(box);
//         wrapper.appendChild(box);
//       }

//       content.appendChild(wrapper);
//     }

//     // Set background image
//     const body = document.body;
//     body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080')";
//     body.style.backgroundSize = 'cover';
//     body.style.backgroundPosition = 'center';
//     body.style.backgroundRepeat = 'no-repeat';

//     // Helper styling function
//     function styleBox(box: HTMLDivElement) {
//       box.style.padding = '20px';
//       box.style.backgroundColor = 'white';
//       box.style.color = 'black';
//       box.style.width = '80%';
//       box.style.maxWidth = '600px';
//       box.style.borderRadius = '16px';
//       box.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
//       box.style.fontSize = '18px';
//       box.style.textAlign = 'center';
//     }
//   }


extractQuotedComments(rawString: string): string[] {
  const regex = /"(.*?)",/gs;
  const matches = [];
  let match;

  while ((match = regex.exec(rawString)) !== null) {
    matches.push(match[0]); // includes the wrapping quotes and comma
  }

  return matches;
}

onSearchClick(): void {
    const content = document.getElementById('main-content');
    if (content) {
      content.innerHTML = ''; // Clear existing content

       const inputTest = {
    comments: [
      "The Now You See Me franchise is a huge guilty pleasure for me. What can I say? It's fun.",
      "so happy that Zach cregger is still in his weird horror era, never wouldve seen that coming watching WKUK back in the day",
      "That looks amazing! I can't wait for the new Now You See Me movie..!",
      "Swaim is so brave.",
      "So you'd think if they were saving the \"Now You Don't\", they'd have used it in a movie where thematically, everyone would be disappearing at the end, like leaving the franchise. But instead, this movie is all about how everyone left in the last movie, and they are now all coming back. So like, they messed up the title on so many levels, it's impressive how bad this movie is from a marketing standpoint.",
      "Wonder how Dan Harmon feels about this?",
      "I promise to obey the title and not see that movie"
    ]
  };

  // Convert comments array to raw JSON string to extract quoted lines
  const jsonString = JSON.stringify(inputTest.comments, null, 2);
  const extractedStrings = this.extractQuotedComments(jsonString);
  console.log(extractedStrings);
  

      // Create main window container
      const mainBox = document.createElement('div');
      mainBox.style.width = '700px';
      mainBox.style.maxHeight = '600px';
      mainBox.style.margin = '50px auto';
      mainBox.style.backgroundColor = '#f9f9f9';
      mainBox.style.borderRadius = '16px';
      mainBox.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
      mainBox.style.overflow = 'hidden';
      mainBox.style.display = 'flex';
      mainBox.style.flexDirection = 'column';

      // Create header box for value1
      const headerBox = document.createElement('div');
      headerBox.textContent = this.value1;
      headerBox.style.padding = '20px';
      headerBox.style.backgroundColor = '#333';
      headerBox.style.color = 'white';
      headerBox.style.fontSize = '20px';
      headerBox.style.fontWeight = 'bold';
      headerBox.style.textAlign = 'center';
      

      // Create scrollable list container
      const listContainer = document.createElement('div');
      listContainer.style.flex = '1';
      listContainer.style.overflowY = 'auto';
      listContainer.style.padding = '20px';
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'column';
      listContainer.style.gap = '12px';

      // Add each quoted string to the scrollable container
      if (extractedStrings.length === 0) {
        const noBox = document.createElement('div');
        noBox.textContent = 'No quoted strings found.';
        styleBox(noBox);
        listContainer.appendChild(noBox);
      } else {
        extractedStrings.forEach(str => {
          const box = document.createElement('div');
          box.textContent = str;
          styleBox(box);
          listContainer.appendChild(box);
        });
      }

      // Assemble mainBox
      mainBox.appendChild(headerBox);
      mainBox.appendChild(listContainer);
      content.appendChild(mainBox);
    }

    // Set background image
    const body = document.body;
    body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080')";
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';

    // Styling for individual quoted string boxes
    function styleBox(box: HTMLDivElement) {
      box.style.padding = '15px';
      box.style.backgroundColor = 'white';
      box.style.color = 'black';
      box.style.borderRadius = '8px';
      box.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
      box.style.fontSize = '16px';
      box.style.textAlign = 'left';
    }
  }


  onSearchClick2(): void {
  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = ''; // Clear previous content

  

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

searchContacts(searchText: string): void {
    console.log(`Searching for contacts with query: ${searchText}`);
    // Implement your search functionality here
  }

   startCountdown() {
    if (this.countdownStarted) return;

    this.countdownStarted = true;
    this.countdownDone = false;
    this.countdown = 10;

    this.interval = setInterval(() => {
      console.log('Time left:', this.countdown);
      this.countdown--;

      if (this.countdown < 0) {
        clearInterval(this.interval);
        this.countdownDone = true;
      }
    }, 1000);
  }
  
   startCountdownAndShowImage(): void {
    if (this.countdownStarted) return; // prevent double start
    this.countdownStarted = true;
    this.countdownDone = false;
    this.countdown = 5;

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

  fetchComments() {
    this.loading = true;
    this.error = '';
    this.comments = [];

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


startCountdownFetchAndDisplay(): void {
  if (this.countdownStarted) return;

  const content = document.getElementById('main-content');
  if (!content) return;
  content.innerHTML = '';

  this.countdownStarted = true;
  this.countdownDone = false;
  this.loading = false;
  this.error = '';
  this.comments = [];

  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.style.margin = '50px auto';
  spinner.style.border = '8px solid #f3f3f3';
  spinner.style.borderTop = '8px solid #3498db';
  spinner.style.borderRadius = '50%';
  spinner.style.width = '60px';
  spinner.style.height = '60px';
  spinner.style.animation = 'spin 1s linear infinite';
  content.appendChild(spinner);

  const img = document.createElement('img');
  img.src = 'assets/angular.png';
  img.alt = 'Angular Logo';
  img.style.display = 'block';
  img.style.margin = '20px auto';
  img.style.height = '200px';
  img.style.width = '200px';
  content.appendChild(img);

  console.log(`Countdown starting...`);
  this.countdown = 5;

  this.interval = setInterval(() => {
    console.log(`${this.countdown}s left`);
    this.countdown--;

    if (this.countdown < 0) {
      clearInterval(this.interval);
      this.countdownStarted = false;
      this.countdownDone = true;
      this.loading = true;

      this.youtubeService.scrapeComments(this.videoUrl).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.loading = false;
          this.comments = response.comments || [];

          content.innerHTML = '';

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

          // ✅ Initialize data for charts
          const spamCounts = { Spam: 0, 'Not Spam': 0, Undefined: 0 };
          const toxicityValues: number[] = [];

          this.comments.forEach((commentObj: any) => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.gap = '10px';
            wrapper.style.alignItems = 'flex-start';

            const commentBox = document.createElement('div');
            commentBox.textContent = commentObj.text;
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
            commentBox.style.display = 'flex';
            commentBox.style.alignItems = 'center';
            commentBox.style.justifyContent = 'center';
            commentBox.style.textAlign = 'center';
            commentBox.title = 'Click to view full comment';
            commentBox.onclick = () => showPopup(commentObj.text);

            const labelWrapper = document.createElement('div');
            labelWrapper.style.display = 'flex';
            labelWrapper.style.flexDirection = 'column';
            labelWrapper.style.alignItems = 'center';
            labelWrapper.style.justifyContent = 'center';
            labelWrapper.style.minWidth = '130px';
            labelWrapper.style.padding = '8px';
            labelWrapper.style.backgroundColor = '#eee';
            labelWrapper.style.borderRadius = '8px';
            labelWrapper.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';

            const spamLabel = document.createElement('div');
            spamLabel.textContent = commentObj.spam !== null ? commentObj.spam : 'undefined';
            spamLabel.style.fontWeight = 'bold';
            spamLabel.style.marginBottom = '10px';

            const divider = document.createElement('div');
            divider.style.borderTop = '1px solid #ccc';
            divider.style.width = '100%';
            divider.style.margin = '6px 0';

            const toxicityTitle = document.createElement('div');
            toxicityTitle.textContent = 'Toxicity Scale';
            toxicityTitle.style.fontSize = '12px';
            toxicityTitle.style.fontWeight = 'bold';
            toxicityTitle.style.marginTop = '4px';

            const toxicityValue = document.createElement('div');
            toxicityValue.textContent = commentObj.toxicity !== null ? commentObj.toxicity : 'undefined';
            toxicityValue.style.fontSize = '14px';
            toxicityValue.style.marginTop = '4px';

            labelWrapper.appendChild(spamLabel);
            labelWrapper.appendChild(divider);
            labelWrapper.appendChild(toxicityTitle);
            labelWrapper.appendChild(toxicityValue);

            wrapper.appendChild(commentBox);
            wrapper.appendChild(labelWrapper);
            mainBox.appendChild(wrapper);

            // ✅ Data processing (moved inside loop)
            if (commentObj.spam === true || commentObj.spam === 'Spam') spamCounts.Spam++;
            else if (commentObj.spam === false || commentObj.spam === 'Not Spam') spamCounts['Not Spam']++;
            else spamCounts.Undefined++;

            toxicityValues.push(typeof commentObj.toxicity === 'number' ? commentObj.toxicity : 0);
          });

          // ✅ Toggle chart button
          const chartToggleBtn = document.createElement('button');
          chartToggleBtn.innerText = 'View Charts';
          chartToggleBtn.style.cssText = `
            margin: 20px auto;
            display: block;
            padding: 10px 20px;
            border-radius: 10px;
            border: none;
            background-color: #1976d2;
            color: white;
            font-weight: bold;
            cursor: pointer;
          `;
         chartToggleBtn.onclick = () => {
  this.toggleChartModal();
  chartToggleBtn.innerText = this.showCharts ? 'Hide Charts' : 'View Charts';
};

          mainBox.appendChild(chartToggleBtn);

          // ✅ Assign chart data for Angular component rendering
          this.spamData = [spamCounts.Spam, spamCounts['Not Spam'], spamCounts.Undefined];
          this.spamChartOptions = {
            chart: { type: 'pie' },
            labels: ['Spam', 'Not Spam', 'Undefined'],
            title: { text: 'Spam Distribution' }
          };

          this.toxicityData = [{
            name: 'Toxicity',
            data: toxicityValues
          }];
          this.toxicityChartOptions = {
            chart: { type: 'bar' },
            xaxis: { categories: toxicityValues.map((_, i) => `Comment ${i + 1}`) },
            title: { text: 'Toxicity Levels by Comment' }
          };

          content.appendChild(mainBox);
          document.body.style.backgroundImage = "url('https://source.unsplash.com/random/1920x1080')";
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
          document.body.style.backgroundRepeat = 'no-repeat';

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

          const resetButton = document.createElement('button');
          resetButton.textContent = 'Reset UI';
          resetButton.style.position = 'fixed';
          resetButton.style.bottom = '20px';
          resetButton.style.left = '20px';
          resetButton.style.padding = '10px 20px';
          resetButton.style.border = 'none';
          resetButton.style.borderRadius = '8px';
          resetButton.style.backgroundColor = '#444';
          resetButton.style.color = '#fff';
          resetButton.style.cursor = 'pointer';
          resetButton.onclick = () => {
            document.getElementById('main-content')!.innerHTML = '';
            this.appendSearchForm();
            resetButton.remove();
          };
          document.body.appendChild(resetButton);
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

appendSearchForm(): void {
  const content = document.getElementById('main-content');
  if (!content) return;

  const container = document.createElement('div');
  container.className = 'search-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'video-url-input';
  input.className = 'search-input';
  input.placeholder = 'Enter YouTube URL';

  const button = document.createElement('button');
  button.className = 'search-button';
  button.id = 'search-btn';

  const icon = document.createElement('span');
  icon.className = 'material-icons';
  icon.textContent = 'search';

  button.appendChild(icon);
  container.appendChild(input);
  container.appendChild(button);
  content.appendChild(container);

  // Add styles if not already added
  if (!document.getElementById('search-style')) {
    const style = document.createElement('style');
    style.id = 'search-style';
    style.innerText = `
      .search-container {
        display: flex;
        align-items: center;
        width: 1200px;
        margin: 100px auto;
        background: #fbfbfb;
        border-radius: 30px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        border: solid 1px black;
        padding: 10px 23px;
        position: fixed;
        top: 20%;
        left: 8%;
      }

      .search-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 16px;
        color: #555;
        background: transparent;
      }

      .search-button {
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
      }

      .material-icons {
        font-size: 20px;
        color: #555;
      }
    `;
    document.head.appendChild(style);
  }

  // Reconnect search button
  const searchBtn = document.getElementById('search-btn');
  const inputEl = document.getElementById('video-url-input') as HTMLInputElement;
  if (searchBtn && inputEl) {
    searchBtn.addEventListener('click', () => {
      this.videoUrl = inputEl.value;
      this.startCountdownFetchAndDisplay();
    });
  }
}

toggleChartModal(): void {
  this.showCharts = !this.showCharts;
}


}
