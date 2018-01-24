import React, { Component } from 'react';
import { fireDB } from '../../api/firebaseApp';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ReportDetails.css';
import { ReportTable } from '../ReportTable/ReportTable';
import moment from 'moment';

class ReportDetails extends Component {
  state = {
    user: null,
  }
  componentWillMount() {
    fireDB.ref('/users').once('value')
      .then((snapshot) => {
        const Team = [
          ...snapshot.val(),
        ];
        Team.filter(item => item.Id === this.props.id)
          .map(item => (
            this.setState({
              user: item,
            })
          ))
      })
      .catch((e) => console.log(e))
  }
  printReport = () => {
    const divToPrint = document.getElementById('report');
    divToPrint.setAttribute('class', 'report-container-print');
    html2canvas(divToPrint)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        var pdf = new jsPDF('l', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0, 295, 210);
        pdf.save('test.pdf');
        divToPrint.removeAttribute('class', 'report-container-print');
      })
      .catch(err => console.log(err))
      ;

  }
  giveMeReport = () => {
    const arrayFromUrl = this.props.path.split('/');
    const reportId = arrayFromUrl.pop();
    const reportArr = this.state.user.Reports.filter(rep => rep.id === reportId);
    const reportObj = reportArr.pop();
    return reportObj;
  }

  dateToArray = (arr) => {
    let arrayConverted = arr.split('.').reverse().slice(1);
    let arrayToInt = [];
    arrayConverted.map(val => {
      arrayToInt.push(parseInt(val))
    });
    arrayToInt[1] = arrayToInt[1] -1;
    return arrayToInt;
  }
  substructDays = (array1, array2) => {
    let firstDayArray = this.dateToArray(array1);
    let lastDayArray = this.dateToArray(array2);
    let firstDay = moment(firstDayArray);
    let lastDay = moment(lastDayArray);
    return lastDay.diff(firstDay, 'days');
  }
  dayPay = (pay) => {
    switch (pay) {
      case "domaća":
        return 20;
        break;
      case "strana":
        return 39.16;
        break;
      case "EX-YU":
        return 97.90;
        break;
      default: 
        return 0;
    }
  }

  render() {
    if (this.state.user) {
      const report = this.giveMeReport();
      const days = this.substructDays(report.date1, report.date2);
      const totalCosts = {
        daily: this.dayPay(report.dailyEarnings) * days,
        transition: +(report.distance * 1.95 / 1000).toFixed(2),
        rest: 0,
        total() {
          let sum = this.daily + this.transition + this.rest;
          return sum;
        },          
      }
      const sum = totalCosts.total();
      const dailyEarnings = this.dayPay(report.dailyEarnings);
      return (
        <div>
          <div className="report-container" id="report">
            <div className="right-border-report" id="report-page-1">
              <p>Preduzeće - Organizacija</p>
              <div className="report-row" style={{ width: '70%' }}>
                <div>
                  <strong style={{ fontSize: '18px' }}>"GotSolution" d.o.o. Banja Luka</strong>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field" style={{ paddingRight: '1rem' }}>
                  <span className="report-text">Broj:</span>
                  <div className="floor-border medium-width-border">{report.protocol}</div>
                </div>
                <div className="report-field">
                  <span className="report-text">Datum:</span>
                  <div className="floor-border medium-width-border">{report.date1}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field" style={{ justifyContent: 'center' }}>
                  <h1 className="nalog-heading">Nalog za službeno putovanje</h1>
                </div>
              </div>
              <br />
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Ime i prezime</span>
                  <div className="floor-border">{`${this.props.firstName} ${this.props.lastName}`}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Raspoređen-na na poslove radnog mesta</span>
                  <div className="floor-border">{this.props.position}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">sa dnevnicom (domaćom ili stranom)</span>
                  <div className="floor-border">{report.dailyEarnings}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Vrsta u iznosu</span>
                  <div className="floor-border floor-border--end">KM&nbsp;</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">otputovaće po službenom poslu u mjesto-a</span>
                  <div className="floor-border">{report.reportName}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <br />
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">radi</span>
                  <div className="floor-border">{report.reason}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Putovanje će trajati</span>&nbsp;
                  <div className="floor-border" style={{ width: '8rem' }}>{this.substructDays(report.date1, report.date2)}</div>
                  <span className="report-text"> dan/a.&nbsp;</span>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Troškovi putovanje padaju na teret</span>
                  <div className="floor-border">{report.typeOfTransport}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Na službenom putu će koristiti prevozno sredstvo</span>
                  <div className="floor-border">{report.typeOfTransport}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <br />
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Pravac putovanja</span>
                  <div className="floor-border">{`Banja luka - ${report.reportName} - Banja Luka`}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Na službenom putu će se zadržati najdalje do: </span>
                  <div className="floor-border">{` ${report.endTime}h,  ${report.date2}`}</div>
                  <span className="report-text"> godine.&nbsp;</span>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ whiteSpace: 'inherit' }}>
                    a u roku od 48 časova po povratku sa službenog puta i dolaska na posao, podneće pismeni izveštaj o obavljenom poslu. Račun o učinjenim putnim troškovima podneti u roku od sedam dana.
                </span>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ paddingRight: '1rem' }}>Putni troškovi padaju na teret </span>
                  <div className="floor-border floor-border--start">{report.costs}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <br />
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ paddingRight: '1rem' }}>Odobravam isplatu akontacije u iznosu od KM</span>
                  <div className="floor-border floor-border--start">0,00</div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="paraf-bottom">
                <div className="report-row-no-line">
                  <div className="report-field report-field--end">
                    <span className="report-text report-text--right-padding">Nalogodavac,</span>
                  </div>
                </div>
                <div className="report-row-no-line">
                  <div className="report-field" style={{ justifyContent: 'center' }}>
                    <span className="report-text">(M.P.)</span>
                  </div>
                </div>
                <br />
                <div className="report-row-no-line report-row-no-line--no-margin">
                  <div className="report-field report-field--end">
                    <div className="floor-border" style={{ width: '15rem', marginRight: '1rem' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="no-right-border-report" id="report-page-2">
              <h4 className="text-center">Na osnovu prednjeg naloga izvršio sam službeno putovanje i podnosim sledeći</h4>
              <h2 className="text-center">PUTNI NALOG</h2>
              <ReportTable
                report={report}
                days={days}
                totalCosts={totalCosts}
                sum={sum}
                dailyEarnings={dailyEarnings}
              />
              <br />
              <br />
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ whiteSpace: 'inherit', fontSize: '1.3rem' }}>
                    Potvrđujem da je putovanje izvršeno prema ovom nalogu i odobravam uplatu
                  </span>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ whiteSpace: 'inherit', fontSize: '1.3rem' }}>
                    putnog računa od KM
                  </span>&nbsp;&nbsp;&nbsp;
                  <div className="floor-border" style={{ width: '8rem', fontSize: '1.2rem' }}>{sum}</div>
                </div>
              </div>
              <br />
              <div className="report-row-no-line">
                <div className="report-field">
                  <div className="floor-border floor-border--start">{`${this.props.firstName} ${this.props.lastName}`}</div>
                  <span className="report-text" style={{ paddingRight: '1rem' }}>na teret</span>
                  <div className="floor-border floor-border--center">kompanije</div>
                </div>
              </div>
              <br />
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ paddingRight: '1rem' }}>U</span>
                  <div className="floor-border floor-border--center" style={{ width: '12rem' }}>Banjoj Luci</div>
                  <span className="report-text" style={{ paddingRight: '1rem' }}>dana</span>
                  <div className="floor-border floor-border--center" style={{ width: '12rem' }}>{`${moment().format('DD.MM.YYYY.')} godine`}</div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="paraf-bottom">
                <div className="report-row-no-line">
                  <div className="report-field report-field--end">
                    <span className="report-text report-text--right-padding" style={{ paddingRight: '8.5rem' }}>Nalogodavac:</span>
                  </div>
                </div>
                <div className="report-row-no-line">
                  <div className="report-field" style={{ justifyContent: 'center' }}>
                    <span className="report-text" style={{ marginRight: '15rem' }}>(M.P.)</span>
                  </div>
                </div>
                <br />
                <div className="report-row-no-line report-row-no-line--no-margin">
                  <div className="report-field report-field--end">
                    <div style={{ width: '22rem' }}>
                      <small style={{ fontSize: '13px' }}>Potpis ovlašćenog lica nalogodavca koje odobrava isplatu</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <button
            className="print-report-button"
            onClick={this.printReport}
          >
            Print report &#128438;
          </button>
          <br />
        </div>

      );
    } else {
      return (
        <div className="load-bar">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      );
    }
  }
}

export default ReportDetails;