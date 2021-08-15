export interface BeforeInstallEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: boolean }>;
}
