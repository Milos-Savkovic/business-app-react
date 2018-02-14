import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fireDB } from '../../api/firebaseApp';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ReportDetails.css';
import { ReportTable } from '../ReportTable/ReportTable';
import PrintIcon from 'material-ui/svg-icons/action/print';
import moment from 'moment';

class ReportDetails extends Component {
  state = {
    user: null,
  }

  componentWillMount() {
    fireDB.ref(`/users/${this.props.id}`).on("value", snapshot => {
      this.setState({
        user: snapshot.val(),
      });
    }, errorObject => {
      console.log("The read failed: " + errorObject.code);
    });
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
  }

  giveMeReport = () => {
    const reps = this.state.user.Reports;
    if (reps) {
      const arrayFromUrl = this.props.path.split('/');
      const reportId = arrayFromUrl.pop();
      const keys = Object.keys(reps);
      const matchingKeys = keys.filter(key => key.indexOf(reportId) !== -1)
      const report = matchingKeys.map(key => reps[key]).pop();
      return report;
    } else return null;
  }

  dateToArray = (array) => {
    let arrayConverted = array.split('.').reverse().slice(1);
    let arrayToInt = [];
    arrayConverted.map(val => (arrayToInt.push(+val)));
    arrayToInt[1] = arrayToInt[1] - 1;
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
      case "strana":
        return 97.90;
      case "EX-YU":
        return 39.16;
      default:
        return 0;
    }
  }
  sumOf = (arrayOf, prop) => {
    if(arrayOf) {
      const arrayOfObjectsProp = arrayOf.map(object => +object[prop]);
      const sumOfObjectsProp = arrayOfObjectsProp.reduce((total, value) => total + value);
      return sumOfObjectsProp;
    } else return 0;
  }

  render() {
    const report = this.giveMeReport();
    if (!report) return <Redirect to={`/users/${this.props.id}`} />
    else {
      if (this.state.user) {
        const direction = (array) => {
          const directions = array.length > 1 ?
            array.filter(city => city.to !== 'Banja Luka').map(city => `${city.to}`).join(' - ') 
            : array.map(city => `${city.to}`);
          return `Banja luka -  ${directions} - Banja luka`
        }
        const days = this.substructDays(report.date1, report.date2) + 1;
        const dailyEarnings = this.dayPay(report.dailyEarnings);
        const cities = report.towns.map(town => (
          {
            from: town.from, to: town.to, distance: town.distance, busTicket: town.busTicket,
          }
        ));
        const totalDistance = this.sumOf(cities, "distance");
        const totalCosts = {
          daily: this.dayPay(report.dailyEarnings) * days,
          transition: report.typeOfTransport !== "službeno" ? (this.sumOf(cities, "busTicket") || +this.sumOf(cities, "distance") * .4) : 0,
          rest: this.sumOf(report.moreCosts, "KM"),
          total() {
            let sum = this.daily + this.transition + this.rest;
            return sum;
          },
        }
        const directions = direction(cities);
        const sum = totalCosts.total().toFixed(2);
        const extraCosts = report.moreCosts.map(obj => {
          const newObj = Object.assign({}, obj);
          newObj.name = newObj.number > 1 ? newObj.name = `${newObj.name}(${newObj.number})` : newObj.name;
          return newObj;
        })
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
                    <div className="floor-border medium-width-border"></div>
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
                    <div className="floor-border floor-border--end">{dailyEarnings}&nbsp;KM&nbsp;</div>
                  </div>
                </div>
                <div className="report-row-no-line">
                  <div className="report-field">
                    <span className="report-text">otputovaće po službenom poslu u mjesto-a</span>
                    <div className="floor-border">{cities.filter(city => city.to !== 'Banja Luka').map(city => city.to).join(', ')}</div>
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
                  <div className="floor-border" style={{ width: '8rem' }}>{this.substructDays(report.date1, report.date2) + 1}</div>
                    <span className="report-text"> dan/a.&nbsp;</span>
                  </div>
                </div>
                <div className="report-row-no-line">
                  <div className="report-field">
                    <span className="report-text">Troškovi putovanje padaju na teret</span>
                    <div className="floor-border">{report.costs}</div>
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
                    <div className="floor-border">{directions}</div>
                  </div>
                </div>
                <div className="report-row-no-line">
                  <div className="report-field">
                    <span className="report-text">Na službenom putu će se zadržati najdalje do: </span>
                    <div className="floor-border">{`${report.date2}`}</div>
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
                  cities={cities}
                  totalDistance={totalDistance}
                  extraCosts={extraCosts}
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
              Print report 
              <PrintIcon 
                // color="#3cb8ff" 
                // hoverColor="#fff" 
                className="print-icon" 
              />
          </button>
            <br />
          </div>

        );
      }
      else {
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
}

export default ReportDetails;