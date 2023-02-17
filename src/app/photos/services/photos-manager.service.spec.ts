import { TestBed } from '@angular/core/testing';

import { PhotosManagerService } from './photos-manager.service';

describe('PhotosManagerService', () => {
  let service: PhotosManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotosManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
