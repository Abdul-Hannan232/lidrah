'use client';

import Widgets from '@layouts/footer/widget/widget';
import Copyright from '@layouts/footer/copyright';
import { footer } from './data';
const { widgets, payment } = footer;

interface FooterProps {
  variant?: 'default' | 'medium';
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  return (
    <footer 
    //  className="mt-[50px] bg-brand-dark lg:mt-14 2xl:mt-16"
     className="pt-[50px] bg-brand-dark lg:pt-14 2xl:pt-16"
    style={{
      // background:" #4B2E2B",
      // background: `linear-gradient(90deg,rgba(75, 46, 43, 1) 5%, rgba(178, 103, 75, 1) 47%, rgba(75, 46, 43, 1) 92%)`

background: `linear-gradient(to right,  rgba(240,183,161,1) 0%, rgba(75, 46, 43, 1) 0%,rgb(177, 122, 100) 53%,rgb(177, 122, 100) 53%, rgba(75, 46, 43, 1)`
    }}>
      <Widgets widgets={widgets} variant={variant} />
      <Copyright payment={payment} variant={variant} />
    </footer>
  );
};

export default Footer;
