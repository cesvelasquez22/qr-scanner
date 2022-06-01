export class QrLog {
  format: string;
  text: string;
  type: string;
  icon: string;
  created: Date;

  constructor(format: string, text: string) {
    this.format = format;
    this.text = text;
    this.created = new Date();

    this.setType();
  }

  private setType() {
    const prefixType = this.text.substr(0, 4);
    console.log('prefixType', prefixType);

    switch (prefixType) {
      case 'http':
        this.type = 'http';
        this.icon = 'globe-outline';
        break;
      case 'geo:':
        this.type = 'geo';
        this.icon = 'location';
        break;
      default:
        this.type = 'none';
        this.icon = 'create';
    }
  }
}
