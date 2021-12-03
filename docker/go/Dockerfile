# Para enviar uma imagem menor com o docker push
# FROM golang:1.17 as builder
# WORKDIR /go/src
# COPY main.go .
# RUN go build -o server main.go

# FROM scratch 
# COPY --from=builder
# CMD [ "./server" ]

FROM golang:1.17
WORKDIR /go/src
COPY main.go .
RUN go build -o server main.go
CMD [ "./server" ]