import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChannelPageFormComponent } from "./channel-page-controls.component";

describe("ChannelNewFormComponent", () => {
  let component: ChannelPageFormComponent;
  let fixture: ComponentFixture<ChannelPageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelPageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
