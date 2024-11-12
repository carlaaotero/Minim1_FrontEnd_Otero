import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity/activity.service';
import { Activity } from '../../models/activity.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {
  activities: Activity[] = [];
  newActivity: Activity = { name: '', date: new Date(), type: '', participants: [], tags: [] };
  errorMessage: string = '';

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
      this.loadActivities();
  }

  loadActivities(): void {
      this.activityService.getActivities().subscribe(
          (data) => {
              this.activities = data;
          },
          (error) => {
              this.errorMessage = 'Error loading activities';
          }
      );
  }

  addActivity(): void {
      this.activityService.createActivity(this.newActivity).subscribe(
          (activity) => {
              this.activities.push(activity);
              this.newActivity = { name: '', date: new Date(), type: '', participants: [], tags: [] }; // Reset form
          },
          (error) => {
              this.errorMessage = 'Error creating activity';
          }
      );
  }

  updateActivity(activity: Activity): void {
      this.activityService.updateActivity(activity._id!, activity).subscribe(
          (updatedActivity) => {
              const index = this.activities.findIndex(a => a._id === updatedActivity._id);
              this.activities[index] = updatedActivity;
          },
          (error) => {
              this.errorMessage = 'Error updating activity';
          }
      );
  }

  deleteActivity(id: string): void {
      this.activityService.deleteActivity(id).subscribe(() => {
          this.activities = this.activities.filter(activity => activity._id !== id);
      }, (error) => {
          this.errorMessage = 'Error deleting activity';
      });
  }

  getActivitiesByTag(tag: string): void {
      this.activityService.getActivitiesByTag(tag).subscribe(
          (data) => {
              this.activities = data;
          },
          (error) => {
              this.errorMessage = 'Error finding activities by tag';
          }
      );
  }
}
