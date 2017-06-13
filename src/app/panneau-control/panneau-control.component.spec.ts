import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PanneauControlComponent } from "./panneau-control.component";

describe("PanneauControlComponent", () => {
  let component: PanneauControlComponent;
  let fixture: ComponentFixture<PanneauControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanneauControlComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanneauControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
