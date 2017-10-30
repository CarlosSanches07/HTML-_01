create table content(
	id serial,
	title varchar(45) not null,
	description text not null,
	humanId int not null
);

alter table content add constraint fk foreign key(humanId) references human(id);

insert into content(title, description, humanId) values('Aplicativos da Web',
														'O Express é um framework para aplicativo da web do Node.js 
														mínimo e flexível que fornece um conjunto 
														robusto de recursos para aplicativos web e móvel.',
														 1);

insert into content(title, description, humanId) values('Hello World', 'Just a test bitches', 5);