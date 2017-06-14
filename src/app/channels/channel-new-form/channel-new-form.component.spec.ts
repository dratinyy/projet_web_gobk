import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChannelNewFormComponent } from "./channel-new-form.component";

describe("ChannelNewFormComponent", () => {
  let component: ChannelNewFormComponent;
  let fixture: ComponentFixture<ChannelNewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelNewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
