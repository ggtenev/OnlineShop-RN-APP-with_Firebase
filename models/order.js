import moment from 'moment'

class Order {
  constructor(id,items,total,date){
  this.id = id
  this.items = items
  this.total = total
  this.date = date
  }
  get readDate(){
    // return this.date.toLocaleDateString('en-EN',{
    //   year:'numeric',
    //   mongth:'long',
    //   day:'numeric'
    // })
    return moment(this.date).format('MMMM Do YYYY')
  }
}

export default Order