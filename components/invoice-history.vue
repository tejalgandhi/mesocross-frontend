<template>
  <div>
    <h2 class="mb-4 text-uppercase">
      Invoice History
    </h2>
    <div class="d-flex align-items-end justify-content-start">
      <div style="min-width: 160px" class="mr-3">
        <label class="mt-3" for="datepicker1">From</label>
        <b-form-datepicker
          id="datepicker1"
          placeholder="Select"
          :date-format-options="{ year: '2-digit', month: '2-digit', day: '2-digit' }"
          locale="en"
        />
      </div>
      <div style="min-width: 160px" class="mr-3">
        <label class="mt-3" for="datepicker2">To</label>
        <b-form-datepicker
          id="datepicker2"
          placeholder="Select"
          :date-format-options="{ year: '2-digit', month: '2-digit', day: '2-digit' }"
          locale="en"
        />
      </div>
      <div class="d-flex align-items-end w-100">
        <div class="mr-3 w-100">
          <label for="search">
            {{$t('search')}}
          </label>
          <input id="search" type="text" placeholder="Search for invoice number, name etc." class="form-control w-100">
        </div>
        <button class="btn btn-dark">
          {{$t('search')}}
        </button>
      </div>
    </div>
    <div class="note my-5">
      <h6>{{$t('note')}}</h6>
      <p>
        *Orders will only be considered paid after sending receipt of payment and receiving the amount in question on
        the account.
      </p>
    </div>

    <div class="history-table">
      <div>
        <b-table small :fields="fields" :items="items" responsive="sm" striped>
          <!-- Optional default data cell scoped slot -->
          <template #cell(action)="data">
            <a href="#">{{ data.value }}</a>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        'date',
        // A column that needs custom formatting
        { key: 'invoice_number', label: 'Invoice Number' },
        // A regular column
        'total_amount',
        // A regular column
        'status',
        'payment_receipt',
        // A virtual column made up from two fields
        { key: 'action', label: '' }
      ],
      items: [
        {
          date: '22/04/2021',
          invoice_number: 'FAC 032/023403',
          total_amount: '622,45 €',
          status: 'Unpaid*',
          payment_receipt: 'Submit receipt',
          action: 'Download.pdf'
        },
        {
          date: '22/04/2021',
          invoice_number: 'FAC 032/023403',
          total_amount: '622,45 €',
          status: 'Unpaid*',
          payment_receipt: 'Submit receipt',
          action: 'Download.pdf'
        },
        {
          date: '22/04/2021',
          invoice_number: 'FAC 032/023403',
          total_amount: '622,45 €',
          status: 'Unpaid*',
          payment_receipt: 'Submit receipt',
          action: 'Download.pdf'
        },
        {
          date: '22/04/2021',
          invoice_number: 'FAC 032/023403',
          total_amount: '622,45 €',
          status: 'Unpaid*',
          payment_receipt: 'Submit receipt',
          action: 'Download.pdf'
        }
      ]
    }
  }
}
</script>

<style>
.store h2 {
  font: normal normal 600 34px Arquitecta;
  letter-spacing: 0px;
  margin: 0 !important;
  color: #25282A;
}

.note h6 {
  font: normal normal 500 16px Arquitecta;
  letter-spacing: 0px;
  color: #fff;
}

.note p {
  font: normal normal normal 14px Arquitecta;
  letter-spacing: 0px;
  color: #fff;
}
.history-table .table thead th {
  font-weight: bold !important;
  border: none !important;
}

.history-table .table thead th,
.history-table .table tbody td {
  padding: 15px 16px !important;
  border: none !important;
}

.history-table tr th {
    text-transform: uppercase;
}

.history-table tr td {
    background-color: #25282A;
}

.history-table tr:nth-child(2n) td {
    background-color: transparent;
}

</style>
