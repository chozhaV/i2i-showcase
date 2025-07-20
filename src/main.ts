import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./app/components/header/header.component";
import { FooterComponent } from "./app/components/footer/footer.component";
import { HomeComponent } from "./app/pages/home/home.component";
import { AboutComponent } from "./app/pages/about/about.component";
import { ContactComponent } from "./app/pages/contact/contact.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      <app-header></app-header>
      <main class="overflow-x-hidden pt-20">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class App {}

const routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "**", redirectTo: "" },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
