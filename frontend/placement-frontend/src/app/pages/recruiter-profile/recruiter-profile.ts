import { Component, OnInit } from '@angular/core';
import { Auth, User } from '../../services/auth';
import { Recruiter, RecruiterData } from '../../services/recruiter';
import { FormsModule } from '@angular/forms';
import { Company, CompanyData } from '../../services/company';

@Component({
  selector: 'app-recruiter-profile',
  imports: [FormsModule],
  templateUrl: './recruiter-profile.html',
  styleUrl: './recruiter-profile.css',
})
export class RecruiterProfile implements OnInit {

  user: User | null = null;
  recruiter: RecruiterData | null = null;

  isLoading = true;
  isSaving = false;

  errorMessage = '';
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  toastTimeout: any;

  profile = {
    name: '',
    email: '',
    phone: '',
    designation: '',
    companyName: '',
    industry: '',
    location: '',
    website: '',
    description: ''
  };

  constructor(
    private auth: Auth,
    private recruiterService: Recruiter,
    private companyService: Company
  ) { }

  ngOnInit(): void {

    this.user = this.auth.getCurrentUser();

    if (!this.user) {
      this.isLoading = false;
      this.errorMessage = 'Please login as a recruiter.';
      return;
    }

    this.loadProfile(this.user.id);
  }

  loadProfile(userId: number): void {

    this.recruiterService.getRecruiterByUserId(userId).subscribe({

      next: (data: RecruiterData) => {

        this.recruiter = data;

        this.profile = {
          name: data.user?.name || '',
          email: data.user?.email || '',
          phone: data.phone || '',
          designation: data.designation || '',
          companyName: data.company?.name || '',
          industry: data.company?.industry || '',
          location: data.company?.location || '',
          website: data.company?.website || '',
          description: data.company?.description || ''
        };

        this.isLoading = false;
      },

      error: (error) => {

        console.error('ERROR LOADING RECRUITER PROFILE:', error);

        this.errorMessage = 'Unable to load your profile.';
        this.isLoading = false;
      }
    });
  }


  updateProfile(): void {

    if (!this.recruiter) {
      return;
    }

    this.errorMessage = '';
    this.isSaving = true;

    const recruiterData = {
      recruiterId: this.recruiter.recruiterId,

      designation: this.profile.designation,
      phone: this.profile.phone,

      user: {
        id: this.recruiter.user.id
      },

      company: {
        companyId: this.recruiter.company.companyId
      }
    };

    const companyData = {
      companyId: this.recruiter.company.companyId,
      name: this.profile.companyName,
      description: this.profile.description,
      industry: this.profile.industry,
      location: this.profile.location,
      website: this.profile.website
    };

    this.recruiterService
      .updateRecruiter(
        this.recruiter.recruiterId,
        recruiterData
      )
      .subscribe({

        next: (updatedRecruiter: RecruiterData) => {

          this.recruiter = updatedRecruiter;

          this.companyService
            .updateCompany(
              this.recruiter.company.companyId,
              companyData
            )
            .subscribe({

              next: (updatedCompany: CompanyData) => {

                this.profile.companyName = updatedCompany.name;
                this.profile.description = updatedCompany.description;
                this.profile.industry = updatedCompany.industry;
                this.profile.location = updatedCompany.location;
                this.profile.website = updatedCompany.website;

                this.isSaving = false;

                this.showToast(
                  'Profile updated successfully.',
                  'success'
                );
              },

              error: (error: any) => {

                console.error(
                  'ERROR UPDATING COMPANY:',
                  error
                );

                this.isSaving = false;

                this.showToast(
                  'Recruiter updated, but company information could not be updated.',
                  'error'
                );
              }
            });
        },

        error: (error: any) => {

          console.error(
            'ERROR UPDATING RECRUITER:',
            error
          );

          this.isSaving = false;

          this.showToast(
            'Unable to update your profile.',
            'error'
          );
        }
      });
  }

  showToast(
    message: string,
    type: 'success' | 'error'
  ): void {

    this.toastMessage = message;
    this.toastType = type;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }
}