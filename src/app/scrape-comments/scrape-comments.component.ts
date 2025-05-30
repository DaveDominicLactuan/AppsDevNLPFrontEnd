import { Component } from '@angular/core';
import { YoutubeService } from '../youtube.service';


@Component({
  selector: 'app-scrape-comments',
  standalone: false,
  templateUrl: './scrape-comments.component.html',
  styleUrl: './scrape-comments.component.css'
})
export class ScrapeCommentsComponent {
 videoUrl: string = '';
  comments: string[] = [];
  loading = false;
  error = '';

  constructor(private youtubeService: YoutubeService) {}

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
}
