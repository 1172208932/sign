import { Lazyload,Button,Popup,AddressEdit ,Toast ,Field,CellGroup,Form    } from 'vant';
import type { App } from 'vue';
// import '@vant/touch-emulator';
import 'vant/lib/index.css';

export const setupVant = (app: App) => {
  app.use(Lazyload);
  app.use(Button);
  app.use(Popup);
  app.use(Toast);
  app.use(AddressEdit);
  app.use(Field);
  app.use(CellGroup);
  app.use(Form);
};
