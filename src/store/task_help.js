export default class Task {
  constructor (
    // id,
    title,
    description,
    departureStation,
    arrivalStation,
    user = null,
    userId = null
  ) {
    // this.id = id
    this.title = title
    this.description = description
    this.departureStation = departureStation
    this.arrivalStation = arrivalStation
    this.user = user
    this.userId = userId
  }
}
