import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-background py-12 md:py-32 px-margin-mobile flex flex-col items-center text-center">
      <div className="max-w-2xl w-full">
        <span className="font-label-caps text-label-caps text-secondary mb-4 block">STAY CONNECTED</span>
        <h2 className="font-headline-lg text-headline-lg mb-4 md:mb-8 uppercase tracking-tight">JOIN THE THRIFT COMMUNITY</h2>
        <p className="font-body-base text-on-surface-variant mb-6 md:mb-12">Get early access to weekly drops, archival stories, and exclusive community events.</p>
        <form className="flex flex-col md:flex-row gap-6 w-full">
          <div className="relative flex-1">
            <label className="absolute -top-6 left-0 font-label-caps text-label-caps text-primary uppercase">Email Address</label>
            <input className="w-full bottom-border-input py-3 focus:outline-none focus:border-b-2 font-label-caps transition-all" placeholder="YOUR@EMAIL.COM" type="email"/>
          </div>
          <button className="bg-primary text-surface px-8 py-2.5 font-headline-lg text-base digital-invert border border-primary w-fit self-center md:self-auto" type="submit">
            SIGN UP
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
