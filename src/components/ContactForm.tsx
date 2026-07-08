import React, { useState } from 'react';
import { User, Mail, Bookmark, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [formValues, setFormValues] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitMode, setSubmitMode] = useState<'real' | 'simulated' | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('form-', '');
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));

    // Realtime error clearing
    if (errors[fieldName] || errors.submit) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        delete next.submit;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formValues.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formValues.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!validateEmail(formValues.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formValues.subject.trim()) {
      newErrors.subject = 'Please state a message subject.';
    }
    if (!formValues.message.trim()) {
      newErrors.message = 'Please write your message here.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || 'd5ec0793-af6d-423a-9498-79cee2341fd0';

    if (accessKey && accessKey.trim() !== '') {
      // Real Web3Forms Submission
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey.trim(),
            name: formValues.name,
            email: formValues.email,
            subject: formValues.subject,
            message: formValues.message,
            from_name: 'Portfolio Contact Form',
          }),
        });

        const data = await response.json();
        if (data.success) {
          setSubmitMode('real');
          setIsSuccess(true);
        } else {
          setErrors({ submit: data.message || 'Error submitting message. Please check your Access Key.' });
        }
      } catch (err) {
        setErrors({ submit: 'Failed to connect to the email service. Please try again later.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Simulate submission & notify user how to connect it
      setTimeout(() => {
        setSubmitMode('simulated');
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1200);
    }
  };

  const handleReset = () => {
    setFormValues({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSuccess(false);
    setSubmitMode(null);
  };

  return (
    <div className="relative p-6 sm:p-8 bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-neutral-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.02)_0%,_transparent_50%)] pointer-events-none" />

      {/* Form Content */}
      <form onSubmit={handleSubmit} noValidate className={`${isSuccess ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
        {/* Name Field */}
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="form-name" className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
            Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <input
              type="text"
              id="form-name"
              placeholder="John Doe"
              value={formValues.name}
              onChange={handleChange}
              className={`w-full bg-neutral-100/50 dark:bg-neutral-900/10 border ${
                errors.name ? 'border-red-500' : 'border-neutral-200/50 dark:border-white/10'
              } rounded-none py-2.5 pl-10 pr-4 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-black focus:dark:focus:border-white focus:bg-white focus:dark:bg-neutral-950/40 focus:outline-none transition-all duration-300`}
            />
          </div>
          {errors.name && <span className="text-2xs text-red-500 font-medium pl-1">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="form-email" className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <input
              type="email"
              id="form-email"
              placeholder="john@example.com"
              value={formValues.email}
              onChange={handleChange}
              className={`w-full bg-neutral-100/50 dark:bg-neutral-900/10 border ${
                errors.email ? 'border-red-500' : 'border-neutral-200/50 dark:border-white/10'
              } rounded-none py-2.5 pl-10 pr-4 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-black focus:dark:focus:border-white focus:bg-white focus:dark:bg-neutral-950/40 focus:outline-none transition-all duration-300`}
            />
          </div>
          {errors.email && <span className="text-2xs text-red-500 font-medium pl-1">{errors.email}</span>}
        </div>

        {/* Subject Field */}
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="form-subject" className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
            Subject
          </label>
          <div className="relative">
            <Bookmark className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <input
              type="text"
              id="form-subject"
              placeholder="Internship Opportunity"
              value={formValues.subject}
              onChange={handleChange}
              className={`w-full bg-neutral-100/50 dark:bg-neutral-900/10 border ${
                errors.subject ? 'border-red-500' : 'border-neutral-200/50 dark:border-white/10'
              } rounded-none py-2.5 pl-10 pr-4 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-black focus:dark:focus:border-white focus:bg-white focus:dark:bg-neutral-950/40 focus:outline-none transition-all duration-300`}
            />
          </div>
          {errors.subject && <span className="text-2xs text-red-500 font-medium pl-1">{errors.subject}</span>}
        </div>

        {/* Message Field */}
        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="form-message" className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
            Message
          </label>
          <div className="relative">
            <textarea
              id="form-message"
              rows={4}
              placeholder="How can Marimuthu help you?"
              value={formValues.message}
              onChange={handleChange}
              className={`w-full bg-neutral-100/50 dark:bg-neutral-900/10 border ${
                errors.message ? 'border-red-500' : 'border-neutral-200/50 dark:border-white/10'
              } rounded-none py-2.5 px-4 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-black focus:dark:focus:border-white focus:bg-white focus:dark:bg-neutral-950/40 focus:outline-none resize-none transition-all duration-300`}
            />
          </div>
          {errors.message && <span className="text-2xs text-red-500 font-medium pl-1">{errors.message}</span>}
        </div>

        {errors.submit && (
          <div className="mb-4 flex items-start gap-2.5 p-3.5 bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errors.submit}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-none bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-white/90 disabled:bg-neutral-400 text-xs font-bold uppercase tracking-widest cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 group"
        >
          {isSubmitting ? (
            <>
              <span>Sending Message...</span>
              <div className="w-4 h-4 border-2 border-white dark:border-neutral-950 border-t-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </>
          )}
        </button>
      </form>

      {/* Success View overlay */}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-white dark:bg-[#151515] rounded-xl z-20 overflow-y-auto"
        >
          {submitMode === 'real' ? (
            <div className="max-w-[340px] flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/5">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                Message Sent!
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                Thank you for reaching out! Your message has been successfully delivered directly to Marimuthu's inbox. He will get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <div className="max-w-[420px] flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50 mb-1.5">
                Form Simulation Active
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                The form works, but you haven't connected it to an inbox yet. To receive real emails from visitors, follow this 30-second setup:
              </p>
              
              <div className="w-full text-left bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 p-3.5 mb-5 text-2xs space-y-2 text-neutral-700 dark:text-neutral-300">
                <div className="flex gap-2">
                  <span className="font-bold text-neutral-900 dark:text-white">1.</span>
                  <span>Register at <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="font-bold underline text-black dark:text-white inline-flex items-center gap-0.5">web3forms.com <ExternalLink className="w-2.5 h-2.5" /></a> to get a free Access Key instantly.</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-neutral-900 dark:text-white">2.</span>
                  <span>Go to the <strong>Settings</strong> panel in AI Studio (or edit your `.env` file) and add:</span>
                </div>
                <div className="bg-neutral-100 dark:bg-black/40 p-2 font-mono text-[10px] text-neutral-900 dark:text-neutral-200 break-all select-all border border-neutral-200/50 dark:border-white/5">
                  VITE_WEB3FORMS_KEY=your_access_key
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-none border border-neutral-200 dark:border-white/10 bg-transparent hover:bg-neutral-50 dark:hover:bg-white/5 text-neutral-600 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-white/20 text-xs uppercase tracking-widest font-bold cursor-pointer transition-all duration-300"
          >
            Send Another Message
          </button>
        </motion.div>
      )}
    </div>
  );
}
