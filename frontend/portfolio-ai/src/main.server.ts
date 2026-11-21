import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { Shell } from './app/shell';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(Shell, config, context);

export default bootstrap;
