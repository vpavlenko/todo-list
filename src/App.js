import React, { Component } from "react";
import "./App.css";

import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";
import List from "material-ui/List/List";
import Paper from "material-ui/Paper";
import ListItem from "material-ui/List/ListItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FloatingActionButton from "material-ui/FloatingActionButton";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import Toggle from "material-ui/Toggle";

//dnd imports
/*
import update from "immutability-helper";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Card from "./Card";
*/
class App extends Component {
	//this.state.todoList
	constructor(props) {
		super(props);
		var state = localStorage.getItem("state");
		if (!state) {
			this.state = {
				tasks: [
					{ text: "one", created: null, lastModified: null, done: false }
				],
				draftTaskValue: "",
				searchTerm: "",
				Snackbar: {
					open: false,
					message: ""
				}
			};
		} else {
			this.state = JSON.parse(state);
		}
	}
	saveChanges() {
		//former updateLocalStorage
		return localStorage.setItem("state", JSON.stringify(this.state));
	}

	updateTask(updatedTask, updatedIndex) {
		this.setState(
			{
				tasks: this.state.tasks.map(
					(task, index) =>
						index === updatedIndex
							? {
									text: updatedTask.text,
									created: updatedTask.created,
									lastModified: Date.now(),
									done: updatedTask.done
								}
							: task
				),
				Snackbar: {
					open: true,
					message:
						'Task "' +
						updatedTask.text +
						'" marked as ' +
						(updatedTask.done === true ? "Done" : "Undone")
				}
			},
			() => {
				this.saveChanges();
			}
		);
	}
	createTask() {
		if (this.state.draftTaskValue !== "") {
			this.setState(
				{
					tasks: this.state.tasks.concat({
						text: this.state.draftTaskValue,
						created: Date.now(),
						done: false
					}),
					draftTaskValue: "",
					Snackbar: {
						open: true,
						message: 'task "' + this.state.draftTaskValue + '" has been added'
					}
				},
				() => {
					this.saveChanges();
				}
			);
		} else {
			alert("the field is empty");
		}
	}
	updateTaskDraft(e) {
		this.setState({
			draftTaskValue: e.target.value,
			//don't like that i have to set it manually. how to resolve?
			Snackbar: { open: false }
		});
	}
	removeTask(index) {
		this.setState(
			{
				tasks: this.state.tasks.filter((value, i) => i !== index),
				Snackbar: {
					open: true,
					message: "task has been removed"
				}
			},
			() => {
				this.saveChanges();
			}
		);
	}
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<Paper
						style={{ width: "500px", padding: "10px", margin: "auto" }}
						zDepth={2}>
						<List>
							{this.state.tasks.map((item, index) => (
								<div>
									<ListItem
										leftCheckbox={
											<Checkbox
												checked={item.done}
												onClick={() =>
													this.updateTask(
														{
															//do i need to update text? I DO
															text: item.text,
															created: item.created,
															done: !item.done
														},
														index
													)}
											/>
										}
										primaryText={item.text}
										style={{ width: "70%" }}
									/>
									<RaisedButton
										label="REMOVE"
										onClick={() => this.removeTask(index)}
									/>
								</div>
							))}
						</List>
						<form
							onSubmit={e => {
								e.preventDefault();
								this.createTask();
							}}>
							<TextField
								hintText="Write your task here"
								//this actually causes value to reset after submitting
								value={this.state.draftTaskValue}
								onChange={e => this.updateTaskDraft(e)}
								onBlur={() => this.saveChanges()}
							/>
						</form>
						<RaisedButton
							label="ADD"
							onClick={() => {
								this.createTask();
							}}
						/>
						<Snackbar
							open={this.state.Snackbar.open}
							message={this.state.Snackbar.message}
							autoHideDuration={2500}
							onRequestClose={this.handleRequestClose}
						/>
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
