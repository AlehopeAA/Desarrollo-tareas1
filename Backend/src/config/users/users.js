// 'use strict'

// class Users {
//   constructor() {
//     this.persons = []
//   }

//   addPerson(socketId, userId, username, name, avatar, roomID) {
//     let person = { socketId, userId, username, name, avatar, roomID }
//     this.persons.push(person)

//     return this.persons
//   }

//   getPerson(socketId) {
//     let person = this.persons.find((person) => person.socketId === socketId)

//     return person
//   }

//   getPersons() {
//     return this.persons
//   }

//   getPersonsByRoom(roomId) {
//     let personsInRoom = this.persons.filter((person) => person.roomID === roomId)
//     return personsInRoom
//   }

//   deletePerson(socketId) {
//     let deletedPerson = this.persons.find((person) => person.socketId === socketId)

//     this.persons = this.persons.filter((person) => person.socketId !== socketId)

//     return deletedPerson
//   }
// }

// module.exports = { Users }
