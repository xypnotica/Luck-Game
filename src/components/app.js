// elements
import { btn } from './dom/elements/panel';
import { selected__numbers, game__ticket } from './dom/elements/body';

// functions
import { showFillTicket, switchMessage } from './dom/functions';

// templates
import { ticketTemplate } from './dom/templates/template';

//
// ─── MAIN FUN ───────────────────────────────────────────────────────────────────
//

const app = function () {
  let ticket = [];
  let allTickets = [];
  switchMessage();
  btn.textContent = 'IGRAJ!';

  const ticketHandler = function () {
    if (allTickets.length !== 5) {
      if (ticket.length < 5) {
        // proveravamo prazno polje, ako je kliknuto na prazno polje nece ubaciti broj
        if (this.textContent !== ' ') ticket.push(this.textContent);

        // brisemo broj sa table kada kliknem na njega
        this.textContent = ' ';

        // menjamo text na glavnom dugmetu
        btn.textContent = 'POTVRDI!';

        // ubacujemo klinuti broj u izabrani brojevi
        [...selected__numbers.children].map((item, index) => {
          item.textContent = ticket[index];
        });
      }
    }
  };

  //
  // ─── POTVRDJUEMO TIKET ──────────────────────────────────────────────────────────
  //

  const addTicketHandler = function () {
    if (allTickets.length !== 5) {
      showTicketHandler();
      rollingGame();

      // resetujemo brojeve na tabli
      showFillTicket(ticketHandler);

      // ubacujemo sve tikete u glavni array
      allTickets.push(ticket);

      // praznimo array posle potvrdjivanja tiketa
      ticket = [];

      // brisemo brojeve iz  tabele izabrani brojevi posle potvrdjivanja tiekta
      [...selected__numbers.children].map(item => {
        item.textContent = '';
      });
    }
  };

  //
  // ─── PRIKAZUJEMO TIKET NA EKRANU ────────────────────────────────────────────────
  //

  const showTicketHandler = function () {
    game__ticket.innerHTML += ticketTemplate(ticket);
  };

  //
  // ─── IZVLACENJE TIKETA ──────────────────────────────────────────────────────────
  //

  const rollingGame = function () {
    if (allTickets.length === 4) {
      btn.textContent = 'ODIGRAJ!';
    }

    if (btn.textContent === 'ODIGRAJ!') {
      console.log('krenuli smo da igramo');
    }
  };

  //
  // ─── GLAVNO DUGME NA KOJE KLIKCEMO ──────────────────────────────────────────────
  //

  btn.onclick = function () {
    if (btn.textContent === 'IGRAJ!') showFillTicket(ticketHandler);
    if (btn.textContent === 'POTVRDI!') addTicketHandler();
    if (btn.textContent === 'ODIGRAJ!') rollingGame();
  };
};

export default app;
